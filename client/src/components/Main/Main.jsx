import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Link as MUILink,
  Rating, // Add this import
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../apis/course";
import generateSlug from "../../utils/hepler.utils";

const CourseCard = ({ course }) => (
  <Grid item xs={12} sm={6} md={3} key={course.CourseId}>
    <Card sx={{ p: 2 }}>
      <MUILink
        as={Link}
        to={`/course/${generateSlug(course.Title)}`}
        state={{ courseId: course.CourseId }}
      >
        <CardMedia
          component="img"
          height="140"
          image={course.CourseImageURL}
          alt={course.Title}
        />
      </MUILink>
      <CardContent sx={{ position: "relative" }}>
        <MUILink
          as={Link}
          sx={{
            textDecoration: "none",
            color: "black",
          }}
          to={`/course/${generateSlug(course.Title)}`}
          state={{ courseId: course.CourseId }}
        >
          <Typography variant="h6">{course.Title}</Typography>
        </MUILink>
        <Typography variant="subtitle2" color="text.secondary">
          {course.UserName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.CategoryDescription}
        </Typography>
        <Typography variant="body2" color="text.primary">
          ₫{course.Price}
        </Typography>
        <Rating value={course.Rating} readOnly precision={0.5} size="small" />
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
);

const Main = () => {
  const [coursesList, setCourses] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getAllCourses();
      setCourses(res.courses);
    };
    fetchCourses();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Course Catalog
      </Typography>
      {isSmallScreen && (
        <IconButton onClick={handleDrawerToggle}>
          <FilterListIcon />
        </IconButton>
      )}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {/* You can remove the filterContent as it's no longer needed */}
      </Drawer>
      <Grid container spacing={3}>
        {coursesList?.map((course) => (
          <CourseCard key={course.CourseId} course={course} />
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
