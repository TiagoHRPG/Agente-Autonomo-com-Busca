class MinHeap {
  constructor() {
      this.heap = [];
  }

  push(value) {
      this.heap.push(value);
      this.heapifyUp();
  }

  pop() {
      if (this.heap.length === 0) return null;

      const top = this.heap[0];
      const last = this.heap.pop();

      if (this.heap.length > 0) {
          this.heap[0] = last;
          this.heapifyDown(0); // Pass the starting index for heapifyDown
      }

      return top;
  }

  top() {
      return this.heap.length > 0 ? this.heap[0] : null;
  }

  empty() {
      return this.heap.length === 0;
  }

  print() {
      let copy = []
      let str = ''
      while (!this.empty()) {
        const top = this.top();
        copy.push(this.pop());
        str += `${top}`  + ' ';
      }
      print(str)
      for (let i = 0; i < copy.length; i++) {
          this.push(copy[i]);
      }
  }

  heapifyUp() {
      let currentIndex = this.heap.length - 1;
      while (currentIndex > 0) {
          const parentIndex = Math.floor((currentIndex - 1) / 2);
          if (this.heap[parentIndex] > this.heap[currentIndex]) {
              [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
              currentIndex = parentIndex;
          } else break;
      }
  }

  heapifyDown(startIndex) { // Accept the starting index as a parameter
      let currentIndex = startIndex;

      while (currentIndex < this.heap.length) {
          const leftChildIndex = currentIndex * 2 + 1;
          const rightChildIndex = currentIndex * 2 + 2;
          let smallestChildIndex = null;

          if (leftChildIndex < this.heap.length) {
              smallestChildIndex = leftChildIndex;
              if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                  smallestChildIndex = rightChildIndex;
              }
          }

          if (smallestChildIndex !== null && this.heap[currentIndex] > this.heap[smallestChildIndex]) {
              [this.heap[currentIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currentIndex]];
              currentIndex = smallestChildIndex;
          } else break;
      }
  }
}
