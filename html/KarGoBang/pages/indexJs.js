window._macaca_runtime_collector = [];
var MaxErrorReportLimit = 100;
var initialPageHref = window.location.href;

// 简单的将错误采集上报到 /api/logs/error
window.onerror = function (message, source, lineno, colno, error) {
    // 同一个页面最多上报100次错误，防止某个循环错误页面一直打开，不断的报错
    if (MaxErrorReportLimit-- < 0) return;
    if (!message) return; // 没有 message 不上报
    if (message === 'ResizeObserver loop limit exceeded' || message === 'ResizeObserver loop completed with undelivered notifications.') return; // 无意义的 message 不上报
    if (source && source.indexOf('chrome-extension://') === 0) return; // chrome 插件注入的不上报
    try {
        var data = {
            message: message,
            source: source,
            lineno: lineno,
            colno: colno,
            stack: error && error.stack,
            traceId: window.appData && window.appData.traceId,
            href: window.location.href
        };
        // Macaca 回归使用
        window._macaca_runtime_collector.push({
            type: 'onerror',
            data: data
        });
        var content = JSON.stringify(data);
        var req = new XMLHttpRequest();
        req.open('post', '/api/logs/error', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(content);

        // yuyanMonitor 记录错误堆栈
        if (window.yuyanMonitor) {
            yuyanMonitor.logError(error, {
                code: 1,
                msg: message
            });
        }

        if (window.appData
            && window.appData.isYuqueMobileApp
            && initialPageHref.indexOf('/r/mobile_app/skeleton_v2') > 0
            && message !== 'Script error.'
            && message.indexOf('lakex_editor_assert_error') < 0) {

            // App 骨架屏错误埋点
            data.instanceId = window.AlipayJSBridge
                && window.AlipayJSBridge.startupParams
                && window.AlipayJSBridge.startupParams.rctInstanceId;

            NativeBridges.monitorEvent({
                eventId: 'skeleton_onerror',
                extParams: data
            });
        }
    } catch (err) {
        console.log('report error', err);
    }
};
window.addEventListener('unhandledrejection', function (e) {
    var data = {
        message: e.reason && e.reason.message,
        stack: e.reason && e.reason.stack,
        href: window.location.href,
        traceId: window.appData && window.appData.traceId
    };
    // Macaca 回归使用
    window._macaca_runtime_collector.push({
        type: 'unhandledrejection',
        data: data
    });
});