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
  * QUI - Quick Sort (recursive implementation), 
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






















