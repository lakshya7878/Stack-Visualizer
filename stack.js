"use strict";

class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
};

class Stack {
  constructor() {
    this.root = null;
    this.stackLength = 0;
  }

  len = () => this.stackLength;

  isEmpty = () => this.stackLength === 0;

  push = (node) => {
    let oldRoot = this.root;
    this.root = new StackNode(node);
    this.root.next = oldRoot;
    this.stackLength++;
  }

  pop = () => {
    if (this.isEmpty()) return null;

    let oldRoot = this.root;
    this.root = oldRoot.next;
    this.stackLength--;
    return oldRoot.value;
  }
};



/* User Visualization */


let
  createStack = document.getElementById('create_stack'),
  push        = document.getElementById('push'),
  pop         = document.getElementById('pop'),
  stackLength = document.getElementById('stack_length'),
  stackBlock  = document.getElementById('stack'),
  stackItems  = document.getElementById('stack_items'),
  outputBlock = document.getElementById('output'),
  empty       = document.getElementById('for_empty'),
  outputMsgs  = '',

  stack       = undefined;

createStack.onclick = (e) => {
  if (stackBlock !== null) {
    stack = new Stack();
    stackBlock.classList.remove('d-none');
    stackLength.innerHTML = stack.len();
    e.target.classList.add('inactive');
    output('> Stack has been created');

    stackInfo(stack);
  }
};

push.onclick = () => {
  let nodeValue = String(document.getElementById('node_value').value);

  if (nodeValue.length === 0 || !nodeValue.trim()) {
    output('> Incorrect value');
  } else {
    stack.push(nodeValue);
    
    if (!stack.isEmpty()) empty.classList.add('d-none');

    let node = document.createElement('div');
    node.classList.add('stack-item');
    node.innerHTML = `<span>${nodeValue}</span>`;
    stackItems.insertBefore(node, stackItems.firstChild);

    output(`> "${nodeValue}" value has been successfully added to the Stack`);
    stackLength.innerHTML = stack.len();

    document.getElementById('node_value').value = '';
    document.getElementById('node_value').focus();

    stackInfo(stack);
  }
};

pop.onclick = () => {
  if (stack.isEmpty()) {
    output('> Nothing to delete. Stack is empty');
  } else {
    let 
      poppedNode = stack.pop(),
      targetNode = document.getElementsByClassName('stack-item')[0];

    targetNode.parentNode.removeChild(targetNode);
    
    output(`> "${poppedNode}" has been successfully removed from the Stack`);
    stackLength.innerHTML = stack.len();
    
    if (stack.isEmpty()) empty.classList.remove('d-none');

    stackInfo(stack);
  }   
};

const output = msg => { 
  outputMsgs = `<div class="output-item">${msg}</div>` + outputMsgs;
  outputBlock.innerHTML = outputMsgs;
}; 

const stackInfo = (stack) => {
  console.log(stack);
  console.log("Is Empty: " + stack.isEmpty());
  console.log("Length: " + stack.len());
};