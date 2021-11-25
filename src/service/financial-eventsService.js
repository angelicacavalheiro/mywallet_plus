import * as repository from '../repositories/financial-eventsRepository.js';

async function validateFinancialEvent(value, type, user) {
  if (!value || !type) {
    return null
  }

  if (!['INCOME', 'OUTCOME'].includes(type)) {
    return null
  }

  if (value < 0) {
    return null
  }

  const insertFinancialEvent = await repository.insertTransaction (value, type, user);
  if(!insertFinancialEvent) {
    return null
  }
  return "valid";
}

async function getEvents(user){
  const events = await repository.fetchUserTransactions(user);
  return events;
}

async function calculateTheSum(user){
  const events = await repository.fetchUserTransactions(user);
  const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
  return sum;
}


export {
  validateFinancialEvent,
  getEvents,
  calculateTheSum,
}
