/* eslint-disable no-console */
import TaskOne from './modules/TaskOne';
import TaskTwo from './modules/TaskTwo';
import TaskThree from './modules/TaskThree';

const divForTaskOne = document.getElementById('taskOne');
const taskOne = new TaskOne(divForTaskOne);
taskOne.init();

const divForTaskTwo = document.getElementById('taskTwo');
const taskTwo = new TaskTwo(divForTaskTwo);
taskTwo.init();

const divForTaskThree = document.getElementById('taskThree');
const taskThree = new TaskThree(divForTaskThree);
taskThree.init();

console.log('app started');
