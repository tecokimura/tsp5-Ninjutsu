export class Time {
    protected value: number = 0

    constructor() {
        this.reset(0)
    }

    reset(value = 0) {
        if (0 <= value) this.value = value
    }

    getCount(): number {
        return this.value
    }

    counting(n: number = 1) {
        this.value += n
    }
}
