import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  Slider,
  Rating,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

// Sample course data
const courses = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "John Doe",
    category: "Web Development",
    price: 300,
    rating: 4.5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    instructor: "Jane Smith",
    category: "Web Development",
    price: 500,
    rating: 4.7,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Data Science with Python",
    instructor: "Alice Johnson",
    category: "Data Science",
    price: 400,
    rating: 4.8,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Machine Learning A-Z",
    instructor: "Bob Brown",
    category: "Data Science",
    price: 600,
    rating: 4.6,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 5,
    title: "Introduction to AWS",
    instructor: "Charlie White",
    category: "Cloud Computing",
    price: 350,
    rating: 4.2,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 6,
    title: "Full-Stack JavaScript",
    instructor: "Dave Black",
    category: "Web Development",
    price: 700,
    rating: 4.9,
    image: "https://via.placeholder.com/300x200",
  },
  // Add more courses as needed
];

const Main = () => {
  // State hooks for filters and drawer
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Event handlers
  const handleCategoryChange = (event) => setCategoryFilter(event.target.value);
  const handlePriceChange = (event, newValue) => setPriceFilter(newValue);
  const handleRatingChange = (event, newValue) => setRatingFilter(newValue);
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  // Filtered courses based on applied filters
  const filteredCourses = courses.filter((course) => {
    return (
      (categoryFilter === "" || course.category === categoryFilter) &&
      course.price >= priceFilter[0] &&
      course.price <= priceFilter[1] &&
      course.rating >= ratingFilter
    );
  });

  // Filter content for both drawer and desktop view
  const filterContent = (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryFilter}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="Web Development">Web Development</MenuItem>
          <MenuItem value="Data Science">Data Science</MenuItem>
          <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
          {/* Add more categories as needed */}
        </Select>
      </FormControl>

      <Box sx={{ minWidth: 200 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={priceFilter}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>

      <Box sx={{ minWidth: 200 }}>
        <Typography gutterBottom>Minimum Rating</Typography>
        <Rating
          value={ratingFilter}
          onChange={handleRatingChange}
          precision={0.5}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Course Catalog
      </Typography>
      {isSmallScreen ? (
        <IconButton onClick={handleDrawerToggle}>
          <FilterListIcon />
        </IconButton>
      ) : (
        <Box sx={{ display: "flex", mb: 2, gap: 2 }}>{filterContent}</Box>
      )}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {filterContent}
      </Drawer>
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={3} key={course.id}>
            <Card sx={{ p: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ position: "relative" }}>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {course.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.category}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  ₫{course.price}
                </Typography>
                <Rating
                  value={course.rating}
                  readOnly
                  precision={0.5}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ position: "absolute", right: 8, bottom: 8 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
