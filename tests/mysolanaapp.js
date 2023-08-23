const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { log } = require("console");
const { SystemProgram } = anchor.web3;

describe("mysolanaapp", () => {
  //crete and set provider
  const provider = anchor.getProvider();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;
  let _baseAccount 
  it('creates a counter)', async () => {
    const baseAccount = anchor.web3.Keypair.generate();
    //call create function via rpc
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    //fetch the account and check the data
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('count 0:  ', account.count.toString());
    assert.ok(account.count.toString() === "0");
    _baseAccount = baseAccount;
  });

  it('increments the counter', async () => {
    //let _baseAccount = anchor.web3.Keypair.generate();
    const baseAccount = _baseAccount;
    // const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('count 1:  ', account.count.toString());
    assert.ok(account.count.toString() === '1');
  });
});

