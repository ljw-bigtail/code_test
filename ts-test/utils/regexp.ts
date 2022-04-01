export default {
  isPhone(phone_num: string, country_code?: string): boolean{
    let regexp: RegExp | null = null
    switch(country_code){
      default:
      case 'cn': regexp = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/; break;
    }
    return regexp.test(phone_num)
  }
}

export let test = '100'

export type AA = {
  val: 'aa'
}