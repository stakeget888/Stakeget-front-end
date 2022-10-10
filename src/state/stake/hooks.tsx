import { Interface } from '@ethersproject/abi'
import { Contract } from '@ethersproject/contracts'
import { Trans } from '@lingui/macro'
import { Pair } from '@stakeget888/sdk'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import ERC20ABI from 'abis/erc20.json'
import { abi as MASTERCHEF_ABI } from 'abis/MasterChef.json'
import { Erc20Interface } from 'abis/types/Erc20'
import { SupportedChainId } from 'constants/chains'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import JSBI from 'jsbi'
import {
  NEVER_RELOAD,
  useMultipleContractSingleData,
  useSingleCallResult,
  useSingleContractMultipleData,
} from 'lib/hooks/multicall'
import tryParseCurrencyAmount from 'lib/utils/tryParseCurrencyAmount'
import { ReactNode, useMemo } from 'react'

import {
  BUSDC_ETHW,
  BUSDT_ETHW,
  CBUSDT_ETHW,
  DAI,
  HDRN_ETHW,
  HEX_ETHW,
  POW_ETHW,
  POW_GOERLI,
  POW_MAINNET,
  SHIB_ETHW,
  TSUKAW_ETHW,
  UNI,
  UNI_GOERLI,
  USDC_MAINNET,
  USDT,
  WBTC,
  WRAPPED_NATIVE_CURRENCY,
} from '../../constants/tokens'

export const MASTERCHEF_ADDRESS: {
  [chainId: number]: string
} = {
  1: '0xF52F8d9620D8eeBcEfce0F80e6fFF05a69ea55fc',
  10001: '0xF52F8d9620D8eeBcEfce0F80e6fFF05a69ea55fc',
  5: '0xF52F8d9620D8eeBcEfce0F80e6fFF05a69ea55fc',
}

export const POWSWAP_DEPLOYMENTS: {
  [chainId: number]: {
    masterchefAddress: string
    sushiPerBlock: JSBI
    powToken: Token
    pools: {
      lpTokenAddress: string
      token0: Token
      token1: Token
      active: boolean
    }[]
  }
} = {
  1: {
    masterchefAddress: '0xF52F8d9620D8eeBcEfce0F80e6fFF05a69ea55fc',
    sushiPerBlock: JSBI.BigInt('1000000000000000000000'),
    powToken: POW_MAINNET,
    pools: [],
  },
  10001: {
    masterchefAddress: '0xF52F8d9620D8eeBcEfce0F80e6fFF05a69ea55fc',
    sushiPerBlock: JSBI.BigInt('1000000000000000000000'),
    powToken: POW_ETHW,
    pools: [
      {
        lpTokenAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        token0: SHIB_ETHW,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHW] as Token,
        active: false,
      },
      {
        lpTokenAddress: '0x0566690aB4A57F03b2716D55d83F88f5fe49C7F6',
        token0: SHIB_ETHW,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHW] as Token,
        active: true,
      },
      {
        lpTokenAddress: '0xbC8FcFa04dDdaC6421229E08B24555a5bD9Ba8DF',
        token0: POW_ETHW,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHW] as Token,
        active: true,
      },
      {
        lpTokenAddress: '0x22708eCe66f074883B6A61ED0d1951Db69bF45c9',
        token0: HEX_ETHW,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHW] as Token,
        active: true,
      },
      {
        lpTokenAddress: '0x58f2e65E97D551944A6d18588A32824E09a7B9ce',
        token0: SHIB_ETHW,
        token1: POW_ETHW,
        active: true,
      },
      {
        lpTokenAddress: '0xE28738559705cD342E38f73e0d41beF166cAE5a2',
        token0: HEX_ETHW,
        token1: POW_ETHW,
        active: true,
      },
      {
        lpTokenAddress: '0xE347740aE32EcD9Fa8bF9e2cDD363e5eA25d4e92',
        token0: HDRN_ETHW,
        token1: POW_ETHW,
        active: true,
      },
      {
        lpTokenAddress: '0x0981C2667f4Ab3C1E025bFE171C382A11699dBe4',
        token0: CBUSDT_ETHW,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHW] as Token,
        active: true,
      },
      {
        lpTokenAddress: '0xFFd6931ba522c73110525a490D0bE9bedB0B294D',
        token0: POW_ETHW,
        token1: BUSDC_ETHW,
        active: true,
      },
      {
        lpTokenAddress: '0x21756F620738a2064B2584fdCb6146d1F4263038',
        token0: POW_ETHW,
        token1: BUSDT_ETHW,
        active: true,
      },
      {
        lpTokenAddress: '0xc4b9B02a8EdF5b89FEed434438aD6862028D63fE',
        token0: TSUKAW_ETHW,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHW] as Token,
        active: true,
      },
      {
        lpTokenAddress: '0x76ab8108de37b1c2c7586f81b377a0f4847f01f3',
        token0: TSUKAW_ETHW,
        token1: POW_ETHW,
        active: true,
      },
    ],
  },
  5: {
    masterchefAddress: '0xF52F8d9620D8eeBcEfce0F80e6fFF05a69ea55fc',
    sushiPerBlock: JSBI.BigInt('1000000000000000000000'),
    powToken: POW_GOERLI,
    pools: [
      {
        lpTokenAddress: '0x34BccF409438F3990aE156D7e68a44f4c328df9d',
        token0: UNI_GOERLI,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.GOERLI] as Token,
        active: true,
      },
      {
        lpTokenAddress: '0x1Db57Fe0f092Ec6548494b2c4d9D18587d98DF08',
        token0: POW_GOERLI,
        token1: WRAPPED_NATIVE_CURRENCY[SupportedChainId.GOERLI] as Token,
        active: false,
      },
    ],
  },
}

const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI)
const MASTERCHEF_INTERFACE = new Interface(MASTERCHEF_ABI)
const AVERAGE_BLOCKTIME = 13.5
const ERC20Interface = new Interface(ERC20ABI) as Erc20Interface

export const STAKING_GENESIS = 1600387200

export const REWARDS_DURATION_DAYS = 60

export const STAKING_REWARDS_INFO: {
  [chainId: number]: {
    tokens: [Token, Token]
    stakingRewardAddress: string
  }[]
} = {
  1: [
    {
      tokens: [WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token, DAI],
      stakingRewardAddress: '0xa1484C3aa22a66C62b77E0AE78E15258bd0cB711',
    },
    {
      tokens: [WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token, USDC_MAINNET],
      stakingRewardAddress: '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b',
    },
    {
      tokens: [WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token, USDT],
      stakingRewardAddress: '0x6C3e4cb2E96B01F4b866965A91ed4437839A121a',
    },
    {
      tokens: [WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token, WBTC],
      stakingRewardAddress: '0xCA35e32e7926b96A9988f61d510E038108d8068e',
    },
  ],
}

export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the pool id
  poolId: number
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  stakedAmount: CurrencyAmount<Token>
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: CurrencyAmount<Token>
  // the total amount of token staked in the contract
  totalStakedAmount: CurrencyAmount<Token>
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: CurrencyAmount<Token>
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: CurrencyAmount<Token>
  // when the period ends
  periodFinish: Date | undefined
  // if pool is active
  active: boolean
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: CurrencyAmount<Token>,
    totalStakedAmount: CurrencyAmount<Token>,
    totalRewardRate: CurrencyAmount<Token>
  ) => CurrencyAmount<Token>
}

// gets the staking info from the network for the active chain id
export function useStakingInfoV2(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useWeb3React()

  const MASTERCHEF_CONTRACT =
    chainId && MASTERCHEF_ADDRESS[chainId] ? new Contract(MASTERCHEF_ADDRESS[chainId], MASTERCHEF_INTERFACE) : undefined

  const pools = chainId && POWSWAP_DEPLOYMENTS[chainId] ? POWSWAP_DEPLOYMENTS[chainId].pools : []

  const powToken = chainId && POWSWAP_DEPLOYMENTS[chainId] ? POWSWAP_DEPLOYMENTS[chainId].powToken : null

  const poolInfoArgs = Array.from(Array(pools.length).keys()).map((value) => [value])
  const poolInfos = useSingleContractMultipleData(MASTERCHEF_CONTRACT, 'poolInfo', poolInfoArgs)

  const userInfoArgs = Array.from(Array(pools.length).keys()).map((value) => [value, account])
  const userInfos = useSingleContractMultipleData(MASTERCHEF_CONTRACT, 'userInfo', userInfoArgs)

  const poolBalances = useMultipleContractSingleData(
    pools.map((pool) => pool.lpTokenAddress),
    ERC20Interface,
    'balanceOf',
    [MASTERCHEF_CONTRACT?.address]
  )

  const pendingPow = useSingleContractMultipleData(MASTERCHEF_CONTRACT, 'pendingSushi', userInfoArgs)

  const totalAllocPoint = useSingleCallResult(MASTERCHEF_CONTRACT, 'totalAllocPoint')

  const stakingInfo: StakingInfo[] = []
  if (pools.length === 0) return []

  pools.forEach((pool, index) => {
    if (!chainId || !POWSWAP_DEPLOYMENTS[chainId]) return
    if (!poolInfos[index].result || !poolBalances[index].result || !totalAllocPoint.result) return
    if (!powToken) return
    if (!pool.active) return
    if (pairToFilterBy && pairToFilterBy.liquidityToken.address.toLowerCase() !== pool.lpTokenAddress.toLowerCase())
      return

    const allocPointFraction1000 =
      (poolInfos[index].result?.at(1).toNumber() / totalAllocPoint.result[0].toNumber()) * 1000

    const totalRewardPerBlock = JSBI.divide(
      JSBI.multiply(POWSWAP_DEPLOYMENTS[chainId].sushiPerBlock, JSBI.BigInt(Math.round(allocPointFraction1000))),
      JSBI.BigInt(1000)
    )

    const dummyPair = new Pair(
      CurrencyAmount.fromRawAmount(pool.token0, '0'),
      CurrencyAmount.fromRawAmount(pool.token1, '0')
    )
    const totalRewardRate = CurrencyAmount.fromRawAmount(
      powToken,
      JSBI.multiply(JSBI.divide(totalRewardPerBlock, JSBI.BigInt(AVERAGE_BLOCKTIME * 10)), JSBI.BigInt(10))
    )

    const stakedAmount = CurrencyAmount.fromRawAmount(
      dummyPair.liquidityToken,
      JSBI.BigInt(userInfos[index].result?.[0] ?? 0)
    )

    const totalStakedAmount = CurrencyAmount.fromRawAmount(
      dummyPair.liquidityToken,
      JSBI.BigInt(poolBalances[index].result?.[0] ?? 0)
    )

    const getHypotheticalRewardRate = (
      stakedAmount: CurrencyAmount<Token>,
      totalStakedAmount: CurrencyAmount<Token>,
      totalRewardRate: CurrencyAmount<Token>
    ): CurrencyAmount<Token> => {
      return CurrencyAmount.fromRawAmount(
        powToken,
        JSBI.greaterThan(totalStakedAmount.quotient, JSBI.BigInt(0))
          ? JSBI.divide(JSBI.multiply(totalRewardRate.quotient, stakedAmount.quotient), totalStakedAmount.quotient)
          : JSBI.BigInt(0)
      )
    }

    const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

    const earnedAmount = CurrencyAmount.fromRawAmount(powToken, JSBI.BigInt(pendingPow[index].result?.[0] ?? 0))

    stakingInfo.push({
      stakingRewardAddress: MASTERCHEF_CONTRACT?.address || '',
      poolId: index,
      tokens: [pool.token0, pool.token1],
      periodFinish: undefined,
      earnedAmount,
      rewardRate: individualRewardRate,
      totalRewardRate,
      stakedAmount,
      totalStakedAmount,
      getHypotheticalRewardRate,
      active: true,
    })
  })

  return stakingInfo
}

// gets the staking info from the network for the active chain id
export function useStakingInfoOld(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useWeb3React()

  // detect if staking is ended
  const currentBlockTimestamp = useCurrentBlockTimestamp()

  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter((stakingRewardInfo) =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? false
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(
          CurrencyAmount.fromRawAmount(tokens[0], '0'),
          CurrencyAmount.fromRawAmount(tokens[1], '0')
        )

        // check for account, if no account set to 0

        const stakedAmount = CurrencyAmount.fromRawAmount(
          dummyPair.liquidityToken,
          JSBI.BigInt(balanceState?.result?.[0] ?? 0)
        )
        const totalStakedAmount = CurrencyAmount.fromRawAmount(
          dummyPair.liquidityToken,
          JSBI.BigInt(totalSupplyState.result?.[0])
        )
        const totalRewardRate = CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: CurrencyAmount<Token>,
          totalStakedAmount: CurrencyAmount<Token>,
          totalRewardRate: CurrencyAmount<Token>
        ): CurrencyAmount<Token> => {
          return CurrencyAmount.fromRawAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.quotient, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.quotient, stakedAmount.quotient), totalStakedAmount.quotient)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishSeconds = periodFinishState.result?.[0]?.toNumber()
        const periodFinishMs = periodFinishSeconds * 1000

        // compare period end timestamp vs current block timestamp (in seconds)
        const active =
          periodFinishSeconds && currentBlockTimestamp ? periodFinishSeconds > currentBlockTimestamp.toNumber() : true

        memo.push({
          stakingRewardAddress: rewardsAddress,
          poolId: 0,
          tokens: info[index].tokens,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate,
          stakedAmount,
          totalStakedAmount,
          getHypotheticalRewardRate,
          active,
        })
      }
      return memo
    }, [])
  }, [
    balances,
    chainId,
    currentBlockTimestamp,
    earnedAmounts,
    info,
    periodFinishes,
    rewardRates,
    rewardsAddresses,
    totalSupplies,
    uni,
  ])
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token | undefined,
  userLiquidityUnstaked: CurrencyAmount<Token> | undefined
): {
  parsedAmount?: CurrencyAmount<Token>
  error?: ReactNode
} {
  const { account } = useWeb3React()

  const parsedInput: CurrencyAmount<Token> | undefined = tryParseCurrencyAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.quotient, userLiquidityUnstaked.quotient)
      ? parsedInput
      : undefined

  let error: ReactNode | undefined
  if (!account) {
    error = <Trans>Connect Wallet</Trans>
  }
  if (!parsedAmount) {
    error = error ?? <Trans>Enter an amount</Trans>
  }

  return {
    parsedAmount,
    error,
  }
}
