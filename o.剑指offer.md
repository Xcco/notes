# 52.正则表达式匹配
请实现一个函数用来匹配包括’.’和’‘的正则表达式。模式中的字符’.’表示任意一个字符，而’‘表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串”aaa”与模式”a.a”和”ab*ac*a”匹配，但是与”aa.a”和”ab*a”均不匹配
```
function isMatch(str, pattern) {
  if (str == null || pattern == null) {
    return false;
  }
  const strArr=str.split('')
  const patArr=pattern.split('')
  let strCom=strArr.slice(1).join('')
  let patCom
//第一个字母相等或为'.'
  if(strArr[0]===pattern[0] ||patArr[0]==='.'){
    patCom=patArr.slice(1).join('')
  }
//判断是否为单一字符连续+'*'
  else if(strArr[0]!==pattern[0] && pattern[0]!=='.'){

    let i=1
    while(patArr[i]===patArr[0]){
      i++
    }
    if(patArr[i]!=='*'){
      return false
    }
    if(strArr[0]!==patArr[i+1]){
      return false
    }
    patCom=patArr.slice(i+2).join('')
  }
  if(strCom===patCom){
    return true
  }else if(strCom==='' || patCom===''){
    return false
  }
//递归调用
  return isMatch(strCom,patCom)
}
```
