# 常见算法总结
```javaScript

/**
 * 冒泡排序 O(n^2)
 */

swap = (a,b,arr) => {
    const temp =arr[a]
    arr.splice(a,1,arr[b])
    arr.splice(b,1,temp)
    return arr
}
bubbleSort = (arr) => {
    for(let j=1;j<arr.length;j++){
        for(let i=0;i<arr.length-j;i++){
            if(arr[i]>arr[i+1]){
                swap(i,i+1,arr)
            }
        }
    }
    return arr
}

/**
 * 选择排序 O(n^2)
 */

swap = (a,b,arr) => {
    const temp =arr[a]
    arr.splice(a,1,arr[b])
    arr.splice(b,1,temp)
    return arr
}
selectSort = (arr) => {
    let tempMin
    for(let j=0;j<arr.length-1;j++){
        tempMin=j
        for(let i=1;i<arr.length;i++){
            if(arr[i]<arr[i-1]){
                tempMin=i
            }
        }
        swap(tempMin,j,arr)
    }
    return arr
}


/**
 * 插入排序 O(n^2)
 */

insertSort = (arr) => {
    const sortArray=[arr[0]]
        for(let i=1;i<arr.length;i++){
            for(let j=0;j<i;j++){
                if(arr[i]<sortArray[j]){
                    sortArray.splice(j,0,arr[i])
                    break
                }else if(j===sortArray.length-1){
                    sortArray.push(arr[i])
                }
            }
        }
    return sortArray
}

/**
 * 快速排序 O(nlgn)
 */

quickSort = (arr) => {
    if(arr.length<2)return arr
    let frontArray=[]
    let backArray=[]
    arr.forEach(value => {
        if(value<arr[0]){
            frontArray.push(value)
        }else{
            backArray.push(value)
        }
    });
    backArray.shift()
    return[...quickSort(frontArray),arr[0],...quickSort(backArray)]
}


/**
 * 归并排序 O(nlogn)
 */

mergeSort = (arr) => {
    let result = []
    arr.forEach(v => result.push([v]))
    smallMerge = (a,b) => {
        if(!b) return a
        const result =[]
        let i=0
        let j=0
        let k=0
        while(k<a.length+b.length){
            if(i===a.length){
                result[k]=b[j]
                j+=1
            }else if(j===b.length){
                result[k]=a[i]
                i+=1
            }else if(a[i]>b[j]){
                result[k]=b[j]
                j+=1
            }else{
                result[k]=a[i]
                i+=1
            }
            k+=1
        }
        return result
    }
    while(result.length>1 && q<6){
        let temp=[]
        for(let i=0;2*i<result.length;i++){
            temp.push(smallMerge(result[2*i],result[2*i+1]))
        }
        result=temp
    }
    return result[0]
}



/**
 * 堆排序
 */

swap = (a,b,arr) => {
    const temp =arr[a]
    arr.splice(a,1,arr[b])
    arr.splice(b,1,temp)
    return arr
}
maxHeapify = (arr, index, heapSize) => {
    let iMax = index
    iLeft = index*2
    iRight = index*2+1
    if(iLeft<heapSize && arr[iMax]<arr[iLeft]){
        iMax=iLeft
    }
    if(iRight<heapSize && arr[iMax]<arr[iRight]){
        iMax=iRight
    }
    if(iMax!==index){
        swap(iMax,index,arr)
        maxHeapify(arr,iMax,heapSize)
    }
}
buildMaxHeap = (arr) => {
    for(let i=Math.floor(arr.length/2-1);i>=0;i--){
        maxHeapify(arr,i,arr.length)
    }
}

heapSort = (arr) => {
    buildMaxHeap(arr)
    for(let i=arr.length-1;i>0;i--){
        swap(0,i,arr)
        maxHeapify(arr,0,i)
    }
    return arr
}
```
