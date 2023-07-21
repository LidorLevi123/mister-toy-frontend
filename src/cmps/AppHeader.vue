<template>
    <header class="app-header main-layout">
        <h1>
            <RouterLink to="/" class="logo">mister<span class="colored-txt">Toy</span></RouterLink>
        </h1>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/toy">Toys</RouterLink>
            <RouterLink to="/dashboard">Dashboard</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>
</template>

<script>
export default {}
</script>