const fs = require('fs');

class LocalStorage {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = this.load();
    }

    load() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // If the file doesn't exist or there's an error reading it, return an empty object
            return {};
        }
    }

    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }

    getItem(key) {
        return this.data[key];
    }

    setItem(key, value) {
        this.data[key] = value;
        this.save();
    }

    removeItem(key) {
        delete this.data[key];
        this.save();
    }

    clear() {
        this.data = {};
        this.save();
    }
}

module.exports = LocalStorage;
