var sex;
var sexFlag;
var username;
var message;
$(function () {
    $(".card-user").css("visibility","visible");
    $("#card-user").hide();
});
function modifyInfo() {
    $(".content-user").html("<div class=\"content-user\">\n" +
        "        <div class=\"details-user\">\n" +
        "<div class=\"wrapper\">\n" +
        "        <div class=\"input-data\">\n" +
        "            <input class=\"wrapper-input\" type=\"text\" required>\n" +
        "            <div class=\"underline\"></div>\n" +
        "            <label class=\"wrapper-label\">您的姓名</label>\n" +
        "        </div>\n" +
        "    </div>" +
        "<div class=\"wrapper-2\">\n" +
        "        <div class=\"input-data-2\">\n" +
        "            <input class=\"wrapper-input-2\" type=\"text\" required>\n" +
        "            <div class=\"underline-2\"></div>\n" +
        "            <label class=\"wrapper-label-2\">您的简介</label>\n" +
        "        </div>\n" +
        "    </div>" +
        "<div class=\"checkbox\">\n" +
        "        <input class='checkbox-input' type=\"checkbox\" name=\"\" id=\"good\" />\n" +
        "        <label class='checkbox-label' for=\"good\"><div class=\"ball\"></div></label>\n" +
        "        <span id='checkbox-sex'>女</span>\n" +
        "      </div>" +
        "            <div class=\"data\">\n" +
        "                <h3 id=\"card-data1\" class=\"h3-user\">\n" +
        "                    0\n" +
        "                    <br />\n" +
        "                    <span class=\"span-user\">游戏局数</span>\n" +
        "                </h3>\n" +
        "                <h3 id=\"card-data2\" class=\"h3-user\">\n" +
        "                    0%\n" +
        "                    <br />\n" +
        "                    <span class=\"span-user\">游戏胜率</span>\n" +
        "                </h3>\n" +
        "                <h3 id=\"card-data3\" class=\"h3-user\">\n" +
        "                    0\n" +
        "                    <br />\n" +
        "                    <span class=\"span-user\">熄灯关数</span>\n" +
        "                </h3>\n" +
        "            </div>\n" +
        "            <div class=\"actionBtn\">\n" +
        "                <button id=\"card-button1\" class=\"button-user\" type=\"button\" onclick=\"saveInfo()\">保存信息</button>\n" +
        "                <button id=\"card-button2\" class=\"button-user\" type=\"button\" onclick=\"getUserDetails()\">取消修改</button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>")
    //按钮操作
    let flag = sex;
    if (sex === "男") {
        $(".checkbox-label").css("background-color", "#277de3");
        $("#checkbox-sex").text("男");
    } else {
        $(".checkbox-label").css("background-color", "#e5275a")
    }
    $(".checkbox-input").click(function () {
        if (flag === "男") {
            $(".checkbox-label").css("background-color", "#e5275a")
            $("#checkbox-sex").text("女");
            flag = "女";
        } else {
            $(".checkbox-label").css("background-color", "#277de3");
            $("#checkbox-sex").text("男");
            flag = "男";
        }
    });

    //输入框操作
    $("#card-message").css("transform", "translateY(-15px)");
    $(".wrapper-input").click(function () {
        $(".wrapper-input").val(username);
    });
    $(".wrapper-input-2").click(function () {
        $(".wrapper-input-2").val(message);
    });
    $(".data").click(function () {
        $(".wrapper-input").val("");
        $(".wrapper-input-2").val("");
    });
    $(".img-user").click(function () {
        $(".wrapper-input").val("");
        $(".wrapper-input-2").val("");
    });

    $(".wrapper").css("transform", "translateY(7px)");
    $(".wrapper-2").css("transform", "translateY(7px)");
    $(".ball").css("left", "3px");


}

function saveInfo() {
    let inputName = $(".wrapper-input").val();
    let inputMessage = $(".wrapper-input-2").val();
    let inputSex = $("#checkbox-sex").text();
    if (username === inputName && message === inputMessage && sex === inputSex) return;
    let formatData = {};
    if (username !== inputName) {
        formatData['username'] = inputName;
    }
    if (message !== inputMessage) {
        formatData['message'] = inputMessage;
    }
    if (sex !== inputSex) {
        formatData['sex'] = inputMessage;
    }
    if (username !== inputName && message !== inputMessage && sex !== inputSex) {
        $.ajax({
            type: "put",
            url: '/api/user/modifyUserDetails',
            async: false,
            data: formatData,
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success: function (data) {
                if (data.code === 200) {
                    getUserDetails();
                } else if (data.code === 401) {
                    window.location = "/login.html";
                } else if (data.code !== 200) {
                    window.alert(data.message);
                }
            },
            error: function () {
                window.location = "/500page.html";
            },
        });
        return;
    }
    $.ajax({
        type: "patch",
        url: '/api/user/modifySomeUserDetails',
        async: true,
        data: formatData,
        dataType: "json",
        xhrFields: {
            withCredentials: true,
        },
        success: function (data) {
            if (data.code === 200) {
                getUserDetails();
            } else if (data.code === 401) {
                window.location = "/login.html";
            } else if (data.code !== 200) {
                window.alert(data.message);
            }
        },
        error: function () {
            window.location = "/500page.html";
        },
    });
}

window.onload = getUserDetails();

function getUserDetails() {
    $.ajax({
        type: 'get',
        url: '/api/user/getUserDetails',
        async: false,
        data: {},
        dataType: 'json',
        xhrFields: {
            withCredentials: true,
        },
        success: function (data) {
            if (data.code === 200) {
                username = data.data.username;
                message = data.data.userInfo.message;

                if (data.data.userInfo.sex === "男") {
                    sexFlag = "fa fa-mars i-user";
                } else {
                    sexFlag = "fa fa-venus i-user";
                }

                $(".content-user").html("<div class=\"content-user\">\n" +
                    "        <div class=\"details-user\">\n" +
                    "            <h2 id=\"card-name\" class=\"h2-user\">" + data.data.username + "\n" +
                    "                <i id=\"card-sex\" class=\"" + sexFlag + "\" aria-hidden=\"true\"></i>\n" +
                    "                <br />\n" +
                    "                <span id=\"card-message\" class=\"span-user\">"+message+"</span></h2>\n" +
                    "            <div class=\"data\">\n" +
                    "                <h3 id=\"card-data1\" class=\"h3-user\">\n" +
                    "                    0\n" +
                    "                    <br />\n" +
                    "                    <span class=\"span-user\">游戏局数</span>\n" +
                    "                </h3>\n" +
                    "                <h3 id=\"card-data2\" class=\"h3-user\">\n" +
                    "                    0%\n" +
                    "                    <br />\n" +
                    "                    <span class=\"span-user\">游戏胜率</span>\n" +
                    "                </h3>\n" +
                    "                <h3 id=\"card-data3\" class=\"h3-user\">\n" +
                    "                    0\n" +
                    "                    <br />\n" +
                    "                    <span class=\"span-user\">熄灯关数</span>\n" +
                    "                </h3>\n" +
                    "            </div>\n" +
                    "            <div class=\"actionBtn\">\n" +
                    "                <button id=\"card-button1\" class=\"button-user\" type=\"button\" onclick=\"modifyInfo()\">登录用户</button>\n" +
                    "                <button id=\"card-button2\" class=\"button-user\" type=\"button\" onclick=\"modifyIcon()\">注册用户</button>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>")
                sex = data.data.userInfo.sex;
                if (data.data.userInfo.sex === "男") {
                    $("#card-sex").css("color", "#0679a2");
                    if (data.data.userInfo.icon===null)
                        $(".img-user").attr("src", "static/images/boy.png");
                }
                if (data.data.userInfo.icon!==null) {
                    icon = data.data.userInfo.icon;
                    $(".img-user").attr("src", icon);
                }

                $("#card-button1").attr("onClick", "modifyInfo()")
                $("#card-message").text(data.data.userInfo.message);
                $("#card-data1").html(data.data.userScore.wins + "<br />\n" +
                    "                    <span class=\"span-user\">游戏局数</span>");
                $("#card-data2").html(data.data.userScore.winRate + '%' + "<br />\n" +
                    "                    <span class=\"span-user\">游戏胜率</span>");
                $("#card-data3").html(data.data.userScore.passNumber + "<br />\n" +
                    "                    <span class=\"span-user\">熄灯关数</span>");
                $("#card-button1").text("修改信息");
                $("#card-button2").text("修改头像");
                $(".h2-user").css("transform", "translateY(-2px)");
                $(".data").css("transform", "translateY(-2px)");
                $(".h2-user").css("font-size", "1.05em");
                $(".span-user").css("font-size", "0.55em");


            } else if (data.code === 401) {
                //未登录
            } else if (data.code !== 200) {
                //未登录
            }
        },
    })
}
var UserDetailsOpenType = false;

function openUserDetails() {

    if (UserDetailsOpenType) {
        let obj = document.getElementById('card-user');
        $("#card-user").fadeOut(500);
        // obj.style.visibility="hidden";
    } else {
        let obj = document.getElementById('card-user');
        // obj.style.visibility="visible";
        $("#card-user").fadeIn(500);
    }
    UserDetailsOpenType = !UserDetailsOpenType;
}

function logout() {
    $.ajax({
        type: 'get',
        url: '/api/auth/logout',
        async: true,
        dataType: 'json',
        xhrFields: {
            withCredentials: true,
        },
        success: function (data) {
            if (data.code === 200) {
                window.location = "/home.html";
            } else {
                window.alert(data.message)
            }
        },
        error: function (data) {
            window.location = "/500page.html";
        },
    })
}