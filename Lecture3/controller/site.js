export class Site{
    constructor(selector){
        this.sel = document.querySelector(selector)
    }
    render(model){        
        this.sel.innerHTML = model.map(block=>block.toHTML()).join('')
    }
}
