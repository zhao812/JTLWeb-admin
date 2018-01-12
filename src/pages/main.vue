<template>
    <div id="app">
        <!--你也可以在其他地方使用<router-view></router-view>来创建嵌套路由，详见vue-router文档-->
        <!-- <transition :name="transitionName"> -->
        <router-view class="child-view"></router-view>
        <!-- </transition> -->
    </div>
</template>