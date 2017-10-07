# 概念
### 

###  all comparison-based sorting algorithms have a lower bound time complexity of Ω(N log N).

###  in-place sorting algorithm 内排序与外排序
it requires only a constant amount 
- 内排序主要操作 比较与移动
### stable 稳定与不稳定
the relative order of elements with the same key value is preserved by the algorithm after sorting is performed.


# 类别
* Comparison-based Sorting Algorithms:
  * BUB - Bubble Sort, - O(n^2)
  * SEL - Selection Sort, - O(n^2) - 移动数据较少
  * INS - Insertion Sort, - O(n^2)
  * MER - Merge Sort (recursive implementation), - O(nlgn)
  * QUI - Quick Sort (recursive implementation), - O(nlgn)
  * R-Q - Random Quick Sort (recursive implementation). -O(nlgn)
* Not Comparison-based Sorting Algorithms:
  * COU - Counting Sort,
  * RAD - Radix Sort.

# 实现
```
function swap(array,a,b) {
    let temp=array[a]
    array[a]=array[b]
    array[b]=temp
}
```
### 冒泡排序
- 比较 n-1 || n(n-1)/2 
- 交换 0 || n(n-1)/2 
```
function bubbleSort(array) {
  let i
  let j
  for (i = 1; i < array.length; i++) {
    for (j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array;
}
```
##### 冒泡排序优化
当确定已经有序后跳出循环
```
function bubbleSort(array) {
  let i
  let j
  let flag = true
  for (i = 1; i < array.length && flag; i++) {
    flag = false
    for (j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
        flag = true
      }
    }
  }
  return array;
}
```
### 选择排序
- 比较 n(n-1)/2 
- 交换 0 || n-1 
```
function selectionSort(array) {
  let i
  let j
  let min
  for (i = 0; i < array.length - 1; i++) {
    min = i
    for (j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j
      }
    }
    swap(array, i, min)
  }
  return array;
}
```
### 插入排序
- 比较 n-1 || n^2/4 || (n+2)(n-1)/2 
- 交换 0 || n^2/4 || (n+4)(n-1)/2 
```
function insertSort(array) {
  let min
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1)
      for (let j = i - 1; j >= 0; j--) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1)
        } else {
          break
        }
      }
    }
  }
  return array;
}
```
##### 希尔排序 
插入排序优化版

### 归并排序
时间 O(nlogn)
空间 O(n+logn)
```
function mergeSort(array) {
  function combine(a, b) {
    let i = 0
    let j = 0
    let temp = []
    for (let k = 0; i < a.length && j < b.length; k++) {
      if (a[i] <= b[j]) {
        temp[k] = a[i]
        i++
      } else {
        temp[k] = b[j]
        j++
      }
    }
    if (i < a.length) {
      temp = temp.concat(a.slice(i))
    } else {
      temp = temp.concat(b.slice(j))
    }
    return temp
  }
//递归
  if (array.length === 1) {
    return array
  } else {
    let l = Math.ceil(array.length / 2)
    let a = mergeSort(array.slice(0, l))
    let b = mergeSort(array.slice(l))
    return combine(a, b)
  }
}
```
##### 优化
将递归recursive转为迭代iteration
```
function mergeSort(array) {
  function combine(a, b) {
    let i = 0
    let j = 0
    let temp = []
    for (let k = 0; i < a.length && j < b.length; k++) {
      if (a[i] <= b[j]) {
        temp[k] = a[i]
        i++
      } else {
        temp[k] = b[j]
        j++
      }
    }
    if (i < a.length) {
      temp = temp.concat(a.slice(i))
    } else {
      temp = temp.concat(b.slice(j))
    }
    return temp
  }
  let newArray=[]
  let newArrayTemp=[]
  for(let i=0;i<array.length;i++){
    newArray.push([array[i]])
  }
  while(newArray.length>1){
      for(let i=0;i<newArray.length/2;i++){
      let a=newArray.slice(2*i,2*i+2)
      if(a.length===1){
        newArrayTemp.push(a[0])
      }else{
        newArrayTemp.push(combine(a[0],a[1]))
      }
    }
    newArray=newArrayTemp
    newArrayTemp=[]
  }
  return newArray[0]
}
```
### 快速排序
时间 O(nlgn) || O(n^2)
```
function quickSort(array) {
  if (array.length <= 1) {
    return array
  }

  function partition(array) {
    let pivot = 0
    let low = 0
    let high = array.length - 1
    while (low !== high) {
      if (pivot === low) {
        if (array[pivot] > array[high]) {
          swap(array, pivot, high)
          pivot = high
        } else {
          high = high - 1
        }
      } else {
        if (array[pivot] < array[low]) {
          swap(array, pivot, low)
          pivot = low
        } else {
          low = low + 1
        }
      }
    }
    return pivot
  }
  let pivot = partition(array)
  let front = quickSort(array.slice(0, pivot))
  let back = quickSort(array.slice(pivot + 1))
  front.push(array[pivot])
  array = front.concat(back)
  return array
}
```
##### 优化
随机快速排序
三数取中(median-of-three):随机选取3个数取中值作为最初的pivot




















