class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const root = new Node(arr[0]);
    let i = 1;
    let curr = root;
    while (i < arr.length) {
      if (arr[i] < curr.value) {
        if (curr.left) {
          curr = curr.left;
        } else {
          curr.left = new Node(arr[i]);
          curr = root;
          i += 1;
        }
      } else {
        if (curr.right) {
          curr = curr.right;
        } else {
          curr.right = new Node(arr[i]);
          curr = root;
          i += 1;
        }
      }
    }
    return root;
  }
}

const arr = [1, 7, 4, 23, 5, -1];
const test = new Tree(arr);
console.log(test.root);
console.log(test.root.right);
