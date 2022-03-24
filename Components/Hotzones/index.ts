/*
功能：根据参数 渲染多个可以自定义（map）点击的图片。
支持页面缩放；支持自定义事件、复制功能、链接跳转功能
*/
type ClickEvent = 'copy' | 'click' | 'href'
type AreaShape = 'default' | 'rect' | 'circle' | 'poly'
type CallBack = () => void
type CallBackSuccess = (data: any) => void

interface HotzoneImg {
  src: string,
  alt?: string,
  width: number,
  height: number
}

interface HotzoneArea {
  shape?: AreaShape,
  coords: number[],
  type?: ClickEvent, // 覆盖options中的type
  hrefOptions?: {
    target: '_blank' | '_self' |  '_parent' | '_top',
    url: string
  },
  data?: any, // 事件回调触发返回的数据
  copyVal?: string // 被复制的值
}

interface Hotzone {
  img: HotzoneImg,
  area: HotzoneArea[]
}

interface Options {
  type?: ClickEvent, // 可操作类型
  domSelector: 'string', // dom 选择 querySelector
  shape?: AreaShape,
  callback?: CallBackSuccess
}

class Hotzones {
  static uuid: number = 0 // 唯一id
  private dom: HTMLElement
  private data: Hotzone[]
  private options: Options
  constructor( data: Hotzone[], options: Options ){
    this.dom = document.querySelector(options.domSelector) as HTMLElement
    this.data = data
    this.options = options
    this.init()
  }
  init(){
    this.initDom()
    this.reloadCoords()
    this.initEvent()
  }
  private appendHTML(ele: HTMLElement, html: string, site?: "before" | "after"): void{
    let div: HTMLElement = document.createElement("div"),
        nodes: NodeListOf<ChildNode>,
        fragment: DocumentFragment = document.createDocumentFragment();
    div.innerHTML = html;
    nodes = div.childNodes;
    for(let i = 0,len = nodes.length; i < len; i++){
      fragment.appendChild(nodes[i].cloneNode(true));
    }
    !site || site !== "before" ? ele.appendChild(fragment) : ele.insertBefore(fragment, ele.firstChild);
    // 回收内存
    nodes = (null as unknown) as NodeListOf<ChildNode>;
    fragment = (null as unknown) as DocumentFragment;
  }
  private initDom(){
    // 插入dom
    this.getElement().forEach((item) =>{
      this.appendHTML(this.dom, item)
    })
  }
  private getElement(): string[]{
    const options = this.options.shape || 'default'
    // 数组生成dom
    return this.data.map(function(item, i){
      Hotzones.uuid++
      let areasHtml: string = ''
      item.area.forEach(function(_item, j){
        const shape = _item.shape || options
        areasHtml += `<area shape="${shape}" coords="${(_item.coords.join(','))}" data-index="${i},${j}" href="${_item.hrefOptions?.url || 'javascript:void(0)'}" target="${_item.hrefOptions?.target || ''}">`
      })
      return `
        <div data-index="${i}" class="hotzone-item">
          <img src="${item.img.src}" usemap="#hotzone-map-${Hotzones.uuid}" alt="${item.img.alt || ''}" class="hotzone-item-img" style="width: 100%">
          <map name="hotzone-map-${Hotzones.uuid}" id="hotzone-map-${Hotzones.uuid}">${areasHtml}</map>
        </div>
      `
    })
  }
  private initEvent(){
    // 事件
    const area_elements = Array.from(this.dom.querySelectorAll('.hotzone-item area')) as HTMLElement[]
    const that = this
    area_elements.forEach((element: HTMLElement) => {
      element.onclick = function(e){
        const areaData: HotzoneArea | undefined = that.getAreaData(e.target as HTMLElement)
        if(!areaData) return
        const type: ClickEvent = areaData.type || that.options.type || 'href'
        if(type == 'copy'){
          that.copy(areaData.copyVal, that.options.callback)
        } else if(type == 'click'){
          that.options.callback && that.options.callback(areaData.data)
        }
      }
    })
    // 重载dom
    window.onresize = this.debounce(this.reloadCoords, 500)
  }
  private getAreaData(area_item: HTMLElement): HotzoneArea | undefined{
    const index: string = area_item.getAttribute('data-index') as string;
    const index_data: number[]  = index.split(',').map(e => parseInt(e))
    if(index_data.length != 2) return
    if(!this.data[index_data[0]] || !this.data[index_data[0]].area[index_data[1]]) return
    return this.data[index_data[0]].area[index_data[1]]
  }
  private setCoords(hotzone_element: HTMLElement, scale: number){
    const area_elements = Array.from(hotzone_element.querySelectorAll('area')) as HTMLElement[]
    const that = this
    area_elements.forEach((area_item: HTMLElement) => {
      const areaData: HotzoneArea | undefined = that.getAreaData(area_item as HTMLElement)
      if(!areaData) return
      const coords_data: number[]  = areaData.coords.map((coords_item: number) => {
        return coords_item * scale
      })
      // 设置新热区位置
      area_item.setAttribute('coords', coords_data.join())
    })
  }
  private reloadCoords(){
    const that = this
    const hotzone_elements = Array.from(this.dom.querySelectorAll('.hotzone-item')) as HTMLElement[]
    hotzone_elements.forEach(function (hotzone_element: HTMLElement) {
      const index: number = parseInt(hotzone_element.getAttribute('data-index') as string);
      that.setCoords(hotzone_element, hotzone_element.offsetWidth / that.data[index].img.width)
    })
  }
  private debounce(fn: CallBack, wait: number) {
    let timer: number | null = null;    
    return () => {
      let context = this
      let args = Array.from(arguments)
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(function(){
        fn.apply(context, args as [])
      }, wait)
    }
  }
  private copy(val: string | undefined, callback: CallBackSuccess | undefined) {
    if(!val) return
    if (document.execCommand('copy')) {
      let input = document.createElement('input') as HTMLInputElement;
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', val);
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, val.length); // 处理iOS兼容
      document.execCommand('copy');
      callback && callback('copy success');
      document.body.removeChild(input);
    } else {
      navigator.clipboard.writeText(val).then(function() {
        callback && callback('copy success');
      });
    }
  }
}