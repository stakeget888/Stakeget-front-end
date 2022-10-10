import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')

export const V2_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x603b8f9e87958493f9e3fec7787ae5296b7f98bd',
  [SupportedChainId.ETHW]: '0x603b8f9e87958493f9e3fec7787ae5296b7f98bd',

  [SupportedChainId.GOERLI]: '0x27830C1c30A23F73499A73Cd80D5a4D18e20aF39',
}

export const V2_ROUTER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC99C1AddC8D6A99340d65Fb0094e1A761D4eE123',
  [SupportedChainId.ETHW]: '0xC99C1AddC8D6A99340d65Fb0094e1A761D4eE123',

  [SupportedChainId.GOERLI]: '0xf2577A5288c827f2247f0AB5609A5e864B13E36B',
}

/* V3 Contract Addresses */
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {}

export const V3_MIGRATOR_ADDRESSES: AddressMap = {}

export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xd0bC0bE5CA5f3b5186e5437925AA012cf07310c0',
  [SupportedChainId.ETHW]: '0xd0bC0bE5CA5f3b5186e5437925AA012cf07310c0',

  [SupportedChainId.GOERLI]: '0x5b25bdeAf49b688d3899A05Da95E11D65bCda4Db',
}

/**
 * The oldest V0 governance address
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The older V1 governance address
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
}
/**
 * The latest governor bravo that is currently admin of timelock
 */
export const GOVERNANCE_BRAVO_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}

export const QUOTER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', []),
}

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xC36442b4a4522E871399CD717aBDD847Ab11FE88', []),
}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ETHW]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}

export const TICK_LENS_ADDRESSES: AddressMap = {}
