function mockedLocalStorage() {
    this.data = {};

    this.setItem = (key, value) => {
        this.data[key] = value;
    };

    this.getItem = (key) => {
        if (typeof this.data[key] === 'undefined') {
            return null;
        }

        return this.data[key];
    }
};

export default mockedLocalStorage;