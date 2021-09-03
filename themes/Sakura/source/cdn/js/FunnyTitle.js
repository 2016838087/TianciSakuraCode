var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/2016838087/SakuraHexoFile@master/themes/images/favicon.ico");
        document.title = 'ヽ(●-`Д´-)ノ不要离开我！';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/2016838087/SakuraHexoFile@master/themes/images/favicon.ico");
        document.title = 'ヾ(Ő∀Ő3)ノ就知道你舍不得我！' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});