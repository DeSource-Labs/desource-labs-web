<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 DeSource Labs. All rights reserved.</p>
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.footer nav ul li {
  margin: 0 10px;
}

.footer nav ul li a {
  color: #fff;
  text-decoration: none;
}

.footer nav ul li a:hover {
  text-decoration: underline;
}
</style>