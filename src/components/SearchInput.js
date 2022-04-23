export class SearchInput {
    constructor(getTemplate) {

        this.getTemplate = getTemplate

        this.searchRepositories = this.debounce(this.searchRepositories, 250)
        this.#getRepositories()
    }

    debounce(fn, ms) {
        let timeout
        return function () {
            const fnCall = () => fn.apply(this, arguments)

            clearTimeout(timeout)
            timeout = setTimeout(fnCall, ms)
        }
    }

    #getRepositories() {
        this.getTemplate
            .searchInput
            .addEventListener('keyup', this.searchRepositories.bind(this))
    }

    async searchRepositories(e) {
        if (e.target.value) {
            await fetch(`https://api.github.com/search/repositories?q=${this.getTemplate.searchInput.value}&per_page=5`)
                .then(res => res.json()
                    .then(res => this.getTemplate.selectList(res)))
        } else {
            this.getTemplate.selectDropdown.innerHTML = ''
        }
    }
}

