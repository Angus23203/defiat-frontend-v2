import {
  claimAnyStake,
  depositAnyStake,
  getAnyStakeContract,
  withdrawAnyStake,
} from "defiat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { useBlock } from "./useBlock";
import { useDeFiat } from "./useDeFiat";

interface StakingPoolData {}

export const usePool = () => {
  const [data, setData] = useState<StakingPoolData>();

  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet();
  const block = useBlock();
  const DeFiat = useDeFiat();

  const AnyStake = useMemo(() => getAnyStakeContract(DeFiat), [DeFiat]);

  const handleClaim = useCallback(async () => {
    const txHash = await claimAnyStake(AnyStake, account);
    return txHash;
  }, [account, AnyStake]);

  const handleDeposit = useCallback(
    async (deposit: string) => {
      const txHash = await depositAnyStake(AnyStake, account, deposit);
      return txHash;
    },
    [account, AnyStake]
  );

  const handleWithdraw = useCallback(
    async (withdraw: string) => {
      const txHash = await withdrawAnyStake(AnyStake, account, withdraw);
      return txHash;
    },
    [account, AnyStake]
  );

  const getData = useCallback(async () => {
    // const userInfo = await getRegulatorInfo()
    const values = await Promise.all([]);

    if (values) {
      // setData({
      // })
    }
  }, []);

  useEffect(() => {
    if (!!account && !!DeFiat) {
      getData();
    }
  }, [account, block, DeFiat, getData]);

  return {
    data,
    claim: handleClaim,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
  };
};
