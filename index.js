
class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.

    this.transactions = [];
  }

  get balance(){
    let balance = 0;
    for (let transaction of this.transactions){
      balance += transaction.value;
    }
    return balance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }

  commit(){
    if(this.isAllowed()){
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Deposit extends Transaction {
  get value(){
    return this.amount;
  }
  isAllowed(){
    return true;
  }
}

class Withdrawal extends Transaction {
  get value(){
    this.isAllowed = true;
    return -this.amount;
  }

  isAllowed(){
    if(this.account.balance > this.amount){
      return true;
    }
    else{
      return false;
    }
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(500.00, myAccount);
t2.commit();

console.log(myAccount.balance);
console.log(myAccount.transactions);
console.log('Ending Balance:', myAccount.balance);
