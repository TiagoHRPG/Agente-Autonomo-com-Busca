class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    enqueue(element, priority) {
        this.elements.push({element, priority});
        this.sortByPriority();
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.elements.shift().element;
    }

    sortByPriority() {
        this.elements.sort((a, b) => a.priority - b.priority);
    }
}