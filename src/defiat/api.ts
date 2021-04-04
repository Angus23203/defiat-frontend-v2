import { Value } from "components/Value";
import Addresses from "constants/addresses";
import { Pools, StakingPool } from "constants/pools";
import { TransactionReceipt } from "web3-core";
import { Contract } from "web3-eth-contract";
import { BigNumber, getTetherAddress } from ".";
import { debug, getBalance, getDisplayBalance } from "../utils";
import { DeFiat } from "./DeFiat";
import { ProcessedRewards } from "./lib/processedRewards";
import { getDeFiatAddress, getPointsAddress } from "./utils";

// Token

export const viewFeeRate = async (DeFiat: Contract): Promise<string> => {
  try {
    const feeRate = await DeFiat.methods._viewFeeRate().call();
    return feeRate;
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const viewBurnRate = async (DeFiat: Contract): Promise<string> => {
  try {
    const burnRate = await DeFiat.methods._viewBurnRate().call();
    return burnRate;
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const getSupplyBurndown = async (
  DeFiat: Contract,
  startBlock: number,
  endBlock: number
) => {
  return [500000, 499500, 498350, 493900, 490000, 486800, 480490, 478500];

  //   try {
  //     const earliestBlock = 11749554;
  //     const dataPoints = 6;

  //     const supplyBurndown = await DeFiat.getPastEvents("Transfer", {
  //       fromBlock: earliestBlock,
  //       toBlock: "latest",
  //       filter: { to: "0x0000000000000000000000000000000000000000" },
  //     });

  //     const latest = supplyBurndown[supplyBurndown.length - 1].blockNumber;
  //     const delta = latest - earliestBlock;
  //     const blocksPerDataPoint = delta / dataPoints;
  //     const blocks = [];
  //     for (let i = 0; i < dataPoints; i++) {
  //       blocks.push(earliestBlock + blocksPerDataPoint * i);
  //     }

  //     const supply = [new BigNumber(500000).multipliedBy(1e18)];
  //     let pointer = 0;
  //     supplyBurndown.forEach((burn) => {
  //       if (burn.blockNumber > blocks[pointer]) {
  //         supply.push(supply[pointer]);
  //         pointer++;
  //       }
  //       supply[pointer] = supply[pointer].minus(burn.returnValues.value);
  //     });

  //     return supply.map((s) => s.dividedBy(1e18).toNumber()); //[maxSupply.toNumber(), ...supply]
  //   } catch (e) {
  //     debug(e);
  //     return [];
  //   }
};

// Points

export const viewDiscountOf = async (
  Points: Contract,
  address: string
): Promise<number> => {
  try {
    const discount: number = await Points.methods
      .viewDiscountOf(address)
      .call();
    return discount;
  } catch (e) {
    debug(e);
    return 0;
  }
};

export const viewDiscountPointsNeeded = async (
  Points: Contract,
  tranche: number
): Promise<string> => {
  try {
    const discount: number = await Points.methods
      .discountPointsNeeded(tranche)
      .call();
    return discount.toString();
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const updateDiscountOf = async (
  Points: Contract,
  address: string
): Promise<string> => {
  return Points.methods
    .updateMyDiscount()
    .send({ from: address })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

// Price

export const getTokenPrice = async (
  Oracle: Contract,
  token: string
): Promise<BigNumber> => {
  try {
    if (token === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
      return new BigNumber(10).pow(18);
    } else {
      const tokenPrice = await Oracle.methods.getUniPrice(token).call();
      return new BigNumber(tokenPrice);
    }
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const getVaultPrice = async (
  Vault: Contract,
  token: string,
  lpToken: string
): Promise<BigNumber> => {
  try {
    const tokenPrice = await Vault.methods.getTokenPrice(token, lpToken).call();
    return new BigNumber(tokenPrice);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

// 2ND

export const swapFor2ndChance = async (
  SecondChance: Contract,
  account: string,
  ethAmount: string,
  ruggedToken: string,
  ruggedAmount: string
) => {
  return SecondChance.methods
    .swapfor2NDChance(ruggedToken, ruggedAmount)
    .send({
      from: account,
      value: ethAmount,
    })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const get2ndChanceSwapRate = async (
  SecondChance: Contract,
  account: string,
  ruggedToken: string,
  ruggedAmount: string
) => {
  try {
    const result = await SecondChance.methods
      .toMint(account, ruggedToken, ruggedAmount)
      .call();
    return new BigNumber(result);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const getEthFee = async (SecondChance: Contract) => {
  try {
    const result = await SecondChance.methods.viewETHfee().call();
    return new BigNumber(result);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const faucet = async (Shitcoin: Contract, account: string) => {
  return Shitcoin.methods
    .faucet()
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

// Rug Sanctuary

export const depositPool = async (
  RugSanctuary: Contract,
  account: string,
  amount: string
) => {
  return await RugSanctuary.methods
    .deposit(0, amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const withdrawPool = async (
  RugSanctuary: Contract,
  account: string,
  amount: string
) => {
  return await RugSanctuary.methods
    .withdraw(0, amount.toString())
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const stakedPool = async (RugSanctuary: Contract, account: string) => {
  try {
    const result = await RugSanctuary.methods.userInfo(0, account).call();
    return new BigNumber(result.amount);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const pendingPool = async (RugSanctuary: Contract, account: string) => {
  try {
    const result = await RugSanctuary.methods.pending(0, account).call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

// AnyStake

export const claimAnyStake = async (
  AnyStake: Contract,
  account: string,
  pid: number
) => {
  return await AnyStake.methods
    .claim(pid)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const depositAnyStake = async (
  AnyStake: Contract,
  account: string,
  pid: number,
  amount: string
) => {
  return await AnyStake.methods
    .deposit(pid, amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const withdrawAnyStake = async (
  AnyStake: Contract,
  account: string,
  pid: number,
  amount: string
) => {
  return await AnyStake.methods
    .withdraw(pid, amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const totalStakedAnyStake = async (AnyStake: Contract, pid: number) => {
  try {
    const result = await AnyStake.methods.poolInfo(pid).call();
    return new BigNumber(result.totalStaked);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const totalValueStakedAllPoolsAnyStake = async (
  Oracle: Contract,
  Defiat: DeFiat,
  AnyStake: Contract,
  pools: StakingPool[]
) => {
  try {
    //const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));
    var totalAllPools: BigNumber = new BigNumber(0);

    const totalStaked = await Promise.all(
      pools.map((pool) =>
        totalValueStakedPoolAnyStake(Oracle, Defiat, AnyStake, pool)
      )
    );

    totalStaked.forEach((stake) => totalAllPools.plus(stake));
    return totalAllPools;
  } catch (e) {
    debug(`ALL POOL STAKE ${e}`);
    return new BigNumber(0);
  }
};

export const totalValueStakedPoolAnyStake = async (
  Oracle: Contract,
  Defiat: DeFiat,
  AnyStake: Contract,
  pool: StakingPool
) => {
  try {
    const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));
    const result = await AnyStake.methods.poolInfo(pool.pid).call();

    let tokenPrice;
    if (pool.pid === 5) {
      tokenPrice = new BigNumber(10).pow(18);
    } else {
      tokenPrice = await getTokenPrice(Oracle, pool.address);
    }
    return tetherprice
      .dividedBy(tokenPrice)
      .multipliedBy(result.totalStaked)
      .dividedBy(new BigNumber(10).pow(pool.decimals));
  } catch (e) {
    debug(`Staked Value ${e}`);
    return new BigNumber(0);
  }
};

export const stakingFeeAnyStake = async (AnyStake: Contract, pid: number) => {
  try {
    const result = await AnyStake.methods.poolInfo(pid).call();
    return new BigNumber(result.stakingFee);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const vipAmountAnyStake = async (AnyStake: Contract, pid: number) => {
  try {
    const result = await AnyStake.methods.poolInfo(pid).call();
    return new BigNumber(result.vipAmount);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const stakedAnyStake = async (
  AnyStake: Contract,
  pid: number,
  account: string
) => {
  try {
    const result = await AnyStake.methods.userInfo(pid, account).call();
    return new BigNumber(result.amount);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const totalValueStakedAnyStake = async (
  Oracle: Contract,
  Defiat: DeFiat,
  AnyStake: Contract,
  pools: StakingPool[],
  account: string
) => {
  try {
    const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));
    var totalAllPools: BigNumber = new BigNumber(0);

    const totalStaked = await Promise.all(
      pools.map((pool) => AnyStake.methods.userInfo(pool.pid, account).call())
    );
    const tokenPrice = await Promise.all(
      pools.map((pool) => getTokenPrice(Oracle, pool.address))
    );
    // let totalAllPools = new BigNumber(0);
    pools.forEach((pool, i) => {
      totalAllPools.plus(
        tetherprice
          .div(tokenPrice[i])
          .times(totalStaked[i])
          .div(new BigNumber(10).pow(pool.decimals))
      );
    });

    return new BigNumber(totalAllPools);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const totalPoolsStakedAnyStake = async (
  AnyStake: Contract,
  pools: StakingPool[],
  account: string
) => {
  try {
    var totalAllPools: number = 0;
    for (const pool of pools) {
      const userinfo = await AnyStake.methods
        .userInfo(pool.pid, account)
        .call();
      if (userinfo.amount > 0) totalAllPools++;
    }
    return totalAllPools.toString();
  } catch (e) {
    debug(e);
    return "0";
  }
};

export const pendingAnyStake = async (
  AnyStake: Contract,
  pid: number,
  account: string
) => {
  try {
    const result = await AnyStake.methods.pending(pid, account).call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const totalPendingAnyStake = async (
  AnyStake: Contract,
  pools: StakingPool[],
  account: string
) => {
  try {
    var totalPending: BigNumber = new BigNumber(0);
    for (const pool of pools) {
      const result = await AnyStake.methods.pending(pool.pid, account).call();
      totalPending = totalPending.plus(result);
    }
    return new BigNumber(totalPending);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const totalPendingVirtualAnyStake = async (
  AnyStake: Contract,
  pools: StakingPool[],
  account: string,
  block: number
) => {
  try {
    var totalPending: BigNumber = new BigNumber(0);
    for (const pool of pools) {
      const result = await pendingVirtualAnyStake(
        AnyStake,
        pool.pid,
        account,
        block
      );
      totalPending = totalPending.plus(result);
    }
    return new BigNumber(totalPending);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const totalPendingRewardsAnyStake = async (AnyStake: Contract) => {
  try {
    const result = await AnyStake.methods.pendingRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const pendingVirtualAnyStake = async (
  AnyStake: Contract,
  pid: number,
  account: string,
  block: number
) => {
  try {
    if (block === 0) {
      return new BigNumber("0");
    }

    const values = await Promise.all([
      AnyStake.methods.poolInfo(pid).call(),
      AnyStake.methods.totalBlockDelta().call(),
      AnyStake.methods.pendingRewards().call(),
      AnyStake.methods.totalEligiblePools().call(),
      AnyStake.methods.lastRewardBlock().call(),
      AnyStake.methods.totalAllocPoint().call(),
      AnyStake.methods.userInfo(pid, account).call(),
      AnyStake.methods.pending(pid, account).call(),
    ]);

    const poolinfo = values[0];
    let totalBlockDelta = values[1];
    const pendingRewards = values[2];
    const totalEligiblePools = values[3];
    const lastRewardBlock = values[4];
    totalBlockDelta = totalBlockDelta.plus(
      totalEligiblePools.multipliedBy(block - lastRewardBlock)
    );
    const poolBlockDelta = new BigNumber(block - poolinfo.lastRewardBlock);
    const totalAlloc = values[5];
    const poolRewards = pendingRewards
      .multipliedBy(poolBlockDelta.dividedBy(totalBlockDelta))
      .multipliedBy(new BigNumber(poolinfo.allocPoint).dividedBy(totalAlloc));
    const userinfo = values[6];
    const virtualpending = new BigNumber(poolRewards)
      .dividedBy(poolinfo.totalStaked)
      .multipliedBy(userinfo.amount);
    const pending = values[7];
    const result = new BigNumber(pending).plus(virtualpending);
    return result;
  } catch (e) {
    return new BigNumber("0");
  }
};

export const getPoolApr = async (
  Oracle: Contract,
  Defiat: DeFiat,
  Vault: Contract,
  AnyStake: Contract,
  pools: StakingPool[],
  pid: number
) => {
  try {
    const values = await Promise.all([
      Vault.methods.lastDistributionBlock().call(),
      AnyStake.methods.totalAllocPoint().call(),
      AnyStake.methods.poolInfo(pid).call(),
      getTokenPrice(Oracle, getDeFiatAddress(Defiat)),
      getTokenPrice(Oracle, getTetherAddress(Defiat)),
      totalValueStakedPoolAnyStake(Oracle, Defiat, AnyStake, pools[pid]),
    ]);

    const latestDistributionBlock = new BigNumber(values[0]);
    const totalAlloc = new BigNumber(values[1]);
    const poolAlloc = new BigNumber(values[2].allocPoint);
    const dftPrice = values[3];
    const tetherPrice = values[4];

    const fromBlock = latestDistributionBlock.minus(50000).lt(12175584)
      ? 12175584
      : latestDistributionBlock.minus(50000);

    const rewardsDistributed = await Vault.getPastEvents("RewardsDistributed", {
      fromBlock: fromBlock,
      toBlock: latestDistributionBlock,
    });

    const earliestBlock = rewardsDistributed[0].blockNumber;

    //skip rewards from earliestblock, they fall outside the delta.
    rewardsDistributed.shift();
    const delta = latestDistributionBlock.minus(earliestBlock);
    let rewardsSum = new BigNumber("0");
    //count all rewards between latestDistributionBlock and earliestBlock
    rewardsDistributed.forEach((rewards) => {
      rewardsSum = rewardsSum.plus(
        new BigNumber(rewards.returnValues["anystakeAmount"])
      );
    });
    const blockrewards = rewardsSum.div(delta);
    // console.log(blockrewards.toString());

    const valuePool = values[5];

    const rewardsperyear = tetherPrice
      .dividedBy(dftPrice)
      .multipliedBy(poolAlloc.dividedBy(totalAlloc))
      .multipliedBy(blockrewards)
      .multipliedBy(new BigNumber(2073600))
      .multipliedBy(1e2);
    const apy = rewardsperyear.dividedBy(valuePool);
    // console.log(apy.toString());
    return apy;
  } catch (e) {
    console.log("APR", e);
    return new BigNumber("0");
  }
};

// Regulator

export const getRegulatorApr = async (
  Oracle: Contract,
  Defiat: DeFiat,
  Vault: Contract,
  Regulator: Contract
) => {
  try {
    const latestDistributionBlock = new BigNumber(
      await Vault.methods.lastDistributionBlock().call()
    );
    const rewardsDistributed = await Vault.getPastEvents("RewardsDistributed", {
      fromBlock: latestDistributionBlock.minus(50000),
      toBlock: latestDistributionBlock,
    });
    const earliestBlock = rewardsDistributed[0].blockNumber;

    //skip rewards from earliestblock, they fall outside the delta.
    rewardsDistributed.shift();
    const delta = latestDistributionBlock.minus(earliestBlock);
    let rewardsSum = new BigNumber("0");
    //count all rewards between latestDistributionBlock and earliestBlock
    rewardsDistributed.forEach((rewards) => {
      rewardsSum = rewardsSum.plus(
        new BigNumber(rewards.returnValues["regulatorAmount"])
      );
    });
    const blockrewards = rewardsSum.dividedBy(delta);

    const totalStaked = await totalStakedRegulator(Regulator);
    const pointsprice = await getTokenPrice(Oracle, getPointsAddress(Defiat));
    const dftprice = await getTokenPrice(Oracle, getDeFiatAddress(Defiat));
    const tetherprice = await getTokenPrice(Oracle, getTetherAddress(Defiat));

    const valueRegulator = tetherprice
      .dividedBy(pointsprice)
      .multipliedBy(totalStaked)
      .dividedBy(1e18);

    const rewardsperyear = tetherprice
      .dividedBy(dftprice)
      .multipliedBy(blockrewards)
      .multipliedBy(0.7) //70% to rewards
      .multipliedBy(new BigNumber(2073600))
      .multipliedBy(1e2);
    const apy = rewardsperyear.dividedBy(valueRegulator);
    return apy;
  } catch (e) {
    console.log(e);
    return new BigNumber("0");
  }
};

export const claimRegulator = async (Regulator: Contract, account: string) => {
  return await Regulator.methods
    .claim()
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const depositRegulator = async (
  Regulator: Contract,
  account: string,
  amount: string
) => {
  return await Regulator.methods
    .deposit(amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const withdrawRegulator = async (
  Regulator: Contract,
  account: string,
  amount: string
) => {
  return await Regulator.methods
    .withdraw(amount)
    .send({ from: account })
    .on("transactionHash", (tx: TransactionReceipt) => {
      debug(tx);
      return tx.transactionHash;
    });
};

export const totalStakedRegulator = async (Regulator: Contract) => {
  try {
    const result = await Regulator.methods.totalShares().call();
    return new BigNumber(result);
  } catch (e) {
    debug(e);
    return new BigNumber(0);
  }
};

export const multiplierRegulator = async (Regulator: Contract) => {
  try {
    const result = await Regulator.methods.priceMultiplier().call();
    return result;
  } catch (e) {
    debug(e);
    return 0;
  }
};

export const stakedRegulator = async (Regulator: Contract, account: string) => {
  try {
    const result = await Regulator.methods.userInfo(account).call();
    return new BigNumber(result.amount);
  } catch (e) {
    debug(e);
    return new BigNumber("0");
  }
};

export const pendingRegulator = async (
  Regulator: Contract,
  account: string
) => {
  try {
    const result = await Regulator.methods.pending(account).call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const pendingTotalRegulator = async (Regulator: Contract) => {
  try {
    const result = await Regulator.methods.pendingRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const buybackRegulator = async (Regulator: Contract) => {
  try {
    const value = await Regulator.methods.buybackBalance().call();
    return new BigNumber(value);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const isAbovePeg = async (Regulator: Contract) => {
  try {
    const value = await Regulator.methods.isAbovePeg().call();
    return value;
  } catch (e) {
    return true;
  }
};

// Vault
export const getBondedRewards = async (Vault: Contract) => {
  try {
    const result = await Vault.methods.bondedRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const getPendingRewardsVault = async (Vault: Contract) => {
  try {
    const result = await Vault.methods.pendingRewards().call();
    return new BigNumber(result);
  } catch (e) {
    return new BigNumber("0");
  }
};

export const getIncomingRewardsVault = async (
  DeFiat: DeFiat,
  DeFiatToken: Contract,
  Vault: Contract,
  AnyStake: Contract,
  Regulator: Contract,
  chainid: number,
  blockNumber: number
) => {
  try {
    if (blockNumber === 0) return [];
    var rewardsData: ProcessedRewards[] = [];

    const incomingBuyBacks = await Vault.getPastEvents("DeFiatBuyback", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });
    let id: number = 0;
    await asyncForEach(incomingBuyBacks, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      rewardsData.push(
        new ProcessedRewards(
          id++,
          timeConverter(block.timestamp),
          rewards.returnValues["buybackAmount"],
          rewards.returnValues["tokenAmount"],
          getSymbol(rewards.returnValues["token"], chainid),
          rewards.transactionHash,
          "DeFiat Buyback",
          "In"
        )
      );
    });

    const pointsBuyBacks = await Vault.getPastEvents("PointsBuyback", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });
    await asyncForEach(pointsBuyBacks, async (rewards) => {
      if (rewards.returnValues["token"] === Addresses.DeFiat[chainid]) {
        const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
        rewardsData.push(
          new ProcessedRewards(
            id++,
            timeConverter(block.timestamp),
            rewards.returnValues["tokenAmount"],
            rewards.returnValues["buybackAmount"],
            getSymbol(rewards.returnValues["token"], chainid),
            rewards.transactionHash,
            "Points Buyback",
            "Out"
          )
        );
      }
    });

    const outgoingClaims = await AnyStake.getPastEvents("Claim", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });

    await asyncForEach(outgoingClaims, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      rewardsData.push(
        new ProcessedRewards(
          id++,
          timeConverter(block.timestamp),
          rewards.returnValues["amount"],
          undefined,
          undefined,
          rewards.transactionHash,
          "Claimed Rewards",
          "Out"
        )
      );
    });

    const outgoingClaimsRegulator = await Regulator.getPastEvents("Claim", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
    });
    await asyncForEach(outgoingClaimsRegulator, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      rewardsData.push(
        new ProcessedRewards(
          id++,
          timeConverter(block.timestamp),
          rewards.returnValues["amount"],
          undefined,
          undefined,
          rewards.transactionHash,
          "Claimed Rewards",
          "Out"
        )
      );
    });

    const incomingTransfers = await DeFiatToken.getPastEvents("Transfer", {
      fromBlock: blockNumber - 5760,
      toBlock: blockNumber,
      filter: { to: Addresses.Vault[chainid] },
    });
    await asyncForEach(incomingTransfers, async (rewards) => {
      const block = await DeFiat.web3.eth.getBlock(rewards.blockNumber);
      if (
        rewardsData.find(
          (x) => x.transactionHash === rewards.transactionHash
        ) === undefined
      ) {
        rewardsData.push(
          new ProcessedRewards(
            id++,
            timeConverter(block.timestamp),
            rewards.returnValues.value,
            undefined,
            undefined,
            rewards.transactionHash,
            "Transfer Fee",
            "In"
          )
        );
      }
    });
    rewardsData.sort((one, two) => (one.timestamp > two.timestamp ? -1 : 1));
    return rewardsData;
  } catch (e) {
    return [];
  }
};

function getSymbol(address: string, chainId: number) {
  if (Addresses.DeFiat[chainId] === address) return "DFTPv2";
  const pools: StakingPool[] = Pools[chainId];
  return pools.find((x) => x.address === address).symbol;
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours().toString().padStart(2, "0");
  var min = a.getMinutes().toString().padStart(2, "0");
  var sec = a.getSeconds().toString().padStart(2, "0");
  var time =
    year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
  return time;
}

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => void
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}
