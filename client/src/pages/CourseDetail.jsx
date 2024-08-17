import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const course = {
  title: "Introduction to Data Science",
  subtitle: "Data Science Basics",
  rating: 4.8,
  studentsCount: 110,
  language: "ENGLISH",
  price: "$55000",
  topics: "DATA SCIENCE AND MACHINE LEARNING",
  about:
    "Learn fundamental concepts in data science, including data exploration, analysis, and visualization.",
  reviews: "No reviews yet",
  instructor: {
    name: "Jane Simon",
    degrees: "Master of Science in Education",
    address:
      "123 College Blvd, East Ward, Springfield District, Springfield City",
    bio: `Jane Simon is an experienced educator with a strong background in curriculum development and instructional design. With a Master of Science in Education, she has worked in various educational settings, ranging from primary schools to higher education institutions. Jane specializes in creating engaging and effective learning experiences that cater to diverse student needs. She has a deep understanding of modern pedagogical techniques and integrates technology into her teaching to enhance learning outcomes. Jane is also actively involved in teacher training programs, where she mentors new educators and helps them develop their teaching skills. Her work has been recognized by several educational bodies.`,
  },
};

const CourseCard = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <HeaderSection
          title={course.title}
          subtitle={course.subtitle}
          rating={course.rating}
          studentsCount={course.studentsCount}
          language={course.language}
        />
        <PriceAndActions price={course.price} />
        <Divider sx={{ my: 2 }} />
        <TopicsSection topics={course.topics} />
        <DescriptionSection description={course.about} />
        <ReviewsSection reviews={course.reviews} />
        <InstructorSection instructor={course.instructor} />
      </CardContent>
    </Card>
  );
};

const HeaderSection = ({
  title,
  subtitle,
  rating,
  studentsCount,
  language,
}) => (
  <Box display="flex" alignItems="center">
    <Avatar
      alt={title}
      src="/static/images/avatar/1.jpg"
      sx={{ width: 56, height: 56, mr: 2 }}
    />
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {subtitle}
      </Typography>
      <Box display="flex" alignItems="center" mt={1}>
        <StarIcon color="primary" />
        <Typography variant="body1" sx={{ ml: 0.5 }}>
          {rating}
        </Typography>
        <Typography variant="body2" sx={{ ml: 1 }}>
          ({studentsCount} students)
        </Typography>
        <Chip label={language} variant="outlined" sx={{ ml: 1 }} />
      </Box>
    </Box>
  </Box>
);

const PriceAndActions = ({ price }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
    <Typography variant="h4" color="primary">
      {price}
    </Typography>
    <Stack direction="column" spacing={1}>
      <Button variant="contained" color="primary">
        Buy now
      </Button>
      <Button variant="outlined" color="primary">
        Add to cart
      </Button>
    </Stack>
  </Box>
);

const TopicsSection = ({ topics }) => (
  <Box>
    <Typography variant="h6">Topics</Typography>
    <Chip label={topics} color="primary" variant="outlined" sx={{ mt: 1 }} />
  </Box>
);

const DescriptionSection = ({ description }) => (
  <Box>
    <Typography variant="h6" sx={{ mt: 2 }}>
      About this course
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Box>
);

const ReviewsSection = ({ reviews }) => (
  <Box>
    <Typography variant="h6" sx={{ mt: 2 }}>
      Reviews
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {reviews}
    </Typography>
  </Box>
);

const InstructorSection = ({ instructor }) => (
  <Box>
    <Typography variant="h6" sx={{ mt: 2 }}>
      Instructor Details
    </Typography>
    <Box display="flex" alignItems="center">
      <Avatar
        alt={instructor.name}
        src="/static/images/avatar/2.jpg"
        sx={{ width: 56, height: 56, mr: 2 }}
      />
      <Box>
        <Typography variant="body1">
          <strong>Name:</strong> {instructor.name}
        </Typography>
        <Typography variant="body1">
          <strong>Degrees:</strong> {instructor.degrees}
        </Typography>
        <Typography variant="body1">
          <strong>Workplace Address:</strong> {instructor.address}
        </Typography>
      </Box>
    </Box>
    <Typography variant="body2" sx={{ mt: 2 }}>
      {instructor.bio}
    </Typography>
  </Box>
);

export default CourseCard;
