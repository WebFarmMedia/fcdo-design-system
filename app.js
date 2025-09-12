const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const { navItems } = require('./navigation-data'); // updated name

const app = express();
const PORT = 3000;

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  const section = req.path.split('/')[1] || 'home';
  res.locals.pageSection = section;
  res.locals.currentPath = req.path;
  res.locals.navItems = navItems;

  const currentNavItem = navItems.find(item => item.slug === section);
  res.locals.hasSubmenus = currentNavItem?.children?.length > 0;
  next();
});

const pageRoutes = require('./routes/routes');
app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
