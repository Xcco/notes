//事件委托
var showMessage = function(event, target) {
        // 阻止 A 链接的默认行为（不进行跳转）
        event.preventDefault();
        // 仅弹窗显示链接的 href 属性
        alert(target.href);
    },
    // 递归查询指定父元素
    findTarget = function(target, tagName) {
        while (target.tagName && target.tagName !== tagName.toUpperCase()) {
            target = target.parentNode;
        }
        return (target.tagName && target.tagName === tagName.toUpperCase()) ? target : null;
    };

document.body.addEventListener('click', function(event) {
    // 间接判断 A 链接是否被点击
    var target = findTarget(event.target, 'a');
    if (target) {
        showMessage(event, target);
    }
}, false);


//compatible way to add event

//add
function addEvent(node, type, handler) {
    if (!node) return false;
    if (node.addEventListener) {
        node.addEventListener(type, handler, false);
        return true;
    }
    else if (node.attachEvent) {
        node['e' + type + handler] = handler;
        node[type + handler] = function() {
            node['e' + type + handler](window.event);
        };
        node.attachEvent('on' + type, node[type + handler]);
        return true;
    }
    return false;
}
//remove
function removeEvent(node, type, handler) {
    if (!node) return false;
    if (node.removeEventListener) {
        node.removeEventListener(type, handler, false);
        return true;
    }
    else if (node.detachEvent) {
        node.detachEvent('on' + type, node[type + handler]);
        node[type + handler] = null;
    }
    return false;
}
