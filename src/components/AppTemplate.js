export class AppTemplate {
    constructor(selector) {
        this.container = document.getElementById(selector)
        this.wrap = this.createElement('div', 'wrap')

        this.searchWrap = this.createElement('div', ['wrap-select', 'select'])
        this.searchInput = this.createElement('input', 'select__input')
        this.searchInput.type = 'text'
        this.searchWrap.append(this.searchInput)

        this.selectDropdown = this.createElement('ul', 'select__list')
        this.searchWrap.append(this.selectDropdown)

        this.resultWrap = this.createElement('div', ['wrap-result', 'result'])
    }


    selectList(item) {
        const {items} = item
        this.selectDropdown.innerHTML = ''
        if (items)
            items.forEach((item, index) => {
                this.selectDropdown.innerHTML += `<li data-itemId=${index}>${item.name}</li>`
            })
        this.getFoundElement().forEach((element, index) => {
            element.addEventListener('click', e => {
                this.resultWrap.innerHTML += `
                            <div class="result__item" data-list=${index}>
                                <ul class="list">
                                    <li>Name: ${items[e.target.dataset.itemid].name}</li>
                                    <li>Qwner: ${items[e.target.dataset.itemid].owner.login}</li>
                                    <li>Stars: ${items[e.target.dataset.itemid].stargazers_count}</li>
                                </ul>
                                <div class="delete" data-delete=${index}>
                                    <div class="item-1" data-delete=${index}></div>
                                    <div class="item-2" data-delete=${index}></div>
                                </div>
                            </div>
                                `
                this.selectDropdown.innerHTML = ''

                const parentElem = this.resultWrap.querySelectorAll(`[data-list]`)
                parentElem.forEach(el => {

                    el.addEventListener('click', (e, index) => {
                        if (e.target.dataset.delete)
                            el.parentNode.removeChild(el)
                    })
                })
            })
        })
    }


    createElement(tagName, className) {
        const element = document.createElement(tagName)
        typeof className === "object"
            ? className.forEach(cls => element.classList.add(cls))
            : element.classList.add(className)
        return element
    }

    render() {
        this.wrap.append(this.searchWrap)
        this.wrap.append(this.resultWrap)
        this.container.append(this.wrap)
    }

    getFoundElement() {
        const elements = this.searchWrap.querySelectorAll('[data-itemId]')
        return elements
    }
    //
    // getListElement() {
    //     const elements = this.searchWrap.querySelectorAll('[data-list]')
    //     return elements
    // }
}