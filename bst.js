class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    arr.sort((a, b) => {
      return a < b ? -1 : 1;
    });
    arr = [...new Set(arr)];
    console.log(arr);
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (arr.length < 1) {
      return;
    }
    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);
    const queue = [
      [root, [0, mid - 1]],
      [root, [mid + 1, arr.length - 1]],
    ];
    while (queue.length > 0) {
      const [parent, [left, right]] = queue.shift(); //first element in array;

      // if there are elements to process and parent node is not NULL
      if (left <= right && parent != null) {
        const mid = Math.floor((left + right) / 2);
        const child = new Node(arr[mid]);

        // set the child node as left or right child of the parent node
        if (arr[mid] < parent.value) {
          parent.left = child;
        } else {
          parent.right = child;
        }

        // push the left and right child and their indices to the queue
        queue.push([child, [left, mid - 1]]);
        queue.push([child, [mid + 1, right]]);
      }
    }
    return root;
  }

  insertNode(value) {
    let curr = this.root;
    while (curr) {
      if (curr.value > value) {
        if (curr.left) {
          curr = curr.left;
        } else {
          curr.left = new Node(value);
          return;
        }
      } else if (curr.value < value) {
        if (curr.right) {
          curr = curr.right;
        } else {
          curr.right = new Node(value);
          return;
        }
      } else {
        console.log("value already exists");
        return;
      }
    }
  }

  deleteNode(node, value) {
    if (!node) {
      return node;
    }

    if (node.value > value) {
      node.left = this.deleteNode(node.left, value);
    } else if (node.value < value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // found node
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      const next = this.findInorder(node);
      node.value = next.value;
      node.right = this.deleteNode(node.right, next.value);
    }

    return node;
  }

  findInorder(node) {
    node = node.right;
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  findNode(value) {
    let curr = this.root;
    while (curr) {
      if (curr.value > value) {
        curr = curr.left;
      } else if (curr.value < value) {
        curr = curr.right;
      } else {
        return curr;
      }
    }
    return null;
  }

  levelOrderITR(callback) {
    const queue = [this.root];
    while (queue) {
      const curr = queue.shift();
      if (curr) {
        callback(curr);
        queue.push(curr.left);
        queue.push(curr.right);
      }
    }
  }

  levelOrderRecur(curr, callback) {
    callback(curr);
    this.levelOrderRecur(curr.left, callback);
    this.levelOrderRecur(curr.right, callback);
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

const printCallBack = (node) => {
  console.log(`Hey Callback we are on value ${node.value}`);
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(arr);
test.prettyPrint(test.root);
//test.levelOrderITR(printCallBack);
//test.levelOrderRecur(test.root, printCallBack);
