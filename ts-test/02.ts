import RegExpTools, {test as TestVal} from './utils/regexp'
// import AA from './utils/regexp'
import type AA from './utils/regexp'
function checkPhone(str: string){
  return RegExpTools.isPhone(str)
}
checkPhone(TestVal)