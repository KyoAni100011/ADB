import React, { useEffect, useState } from "react";
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
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "react-router-dom";
import { getCourseById } from "../apis/course";

// Main CourseCard Component
const CourseCard = () => {
  const location = useLocation();
  const { courseId } = location.state || {};
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        try {
          const { course: courseData } = await getCourseById(courseId);
          const categories = JSON.parse(courseData.Categories || "[]");
          const reviews = JSON.parse(courseData.Reviews || "[]");

          setCourse({
            title: courseData.CourseTitle,
            subtitle: courseData.Subtitle,
            rating: courseData.CourseRating,
            studentsCount: courseData.NumberStudentsRegister,
            language: courseData.Language,
            price: courseData.Price,
            topics: categories.map((c) => c.Category).join(", "),
            about: courseData.CourseDescription,
            reviews: reviews.length
              ? reviews
              : [{ Review: "No reviews yet", ReviewRating: 0 }],
            instructor: {
              name: courseData.LecturerName,
              degrees: courseData.Degrees,
              address: `${courseData.CurrentWorkplaceStreet}, ${courseData.CurrentWorkplaceWard}, ${courseData.CurrentWorkplaceDistrict}, ${courseData.CurrentWorkplaceCity}`,
              bio: courseData.Biography,
            },
          });
        } catch (err) {
          console.error("Error fetching course data:", err);
        }
      } else {
        setCourse({
          title: "Web Development Bootcamp",
          subtitle: "Complete Web Development",
          rating: 4.9,
          studentsCount: 160,
          language: "English",
          price: "60000",
          topics: "Web Development",
          about:
            "An intensive bootcamp covering HTML, CSS, JavaScript, and modern web development frameworks.",
          reviews: [
            {
              Review: "Great course for beginners. Very well explained!",
              ReviewRating: 5,
              TimeReview: "2024-08-15T22:43:53.863",
              UserName: "John Doe",
              AvatarUrl: "/static/images/avatar/1.jpg",
            },
            {
              Review:
                "The content is good, but it needs more practical examples.",
              ReviewRating: 3.5,
              TimeReview: "2024-08-15T22:43:53.863",
              UserName: "Bob Brown",
              AvatarUrl: "/static/images/avatar/2.jpg",
            },
          ],
          instructor: {
            name: "Jane Simon",
            degrees: "Master of Science in Education",
            address:
              "123 College Blvd, East Ward, Springfield District, Springfield City",
            bio: `Jane Simon is an experienced educator with a strong background in curriculum development and instructional design. With a Master of Science in Education, she has worked in various educational settings, ranging from primary schools to higher education institutions. Jane specializes in creating engaging and effective learning experiences that cater to diverse student needs. She has a deep understanding of modern pedagogical techniques and integrates technology into her teaching to enhance learning outcomes. Jane is also actively involved in teacher training programs, where she mentors new educators and helps them develop their teaching skills. Her work has been recognized by several educational bodies.`,
          },
        });
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return null;

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

// HeaderSection Component
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

// PriceAndActions Component
const PriceAndActions = ({ price }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
    <Typography variant="h4" color="primary">
      ${price}
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

// TopicsSection Component
const TopicsSection = ({ topics }) => (
  <Box>
    <Typography variant="h6">Topics</Typography>
    <Chip label={topics} color="primary" variant="outlined" sx={{ mt: 1 }} />
  </Box>
);

// DescriptionSection Component
const DescriptionSection = ({ description }) => (
  <Box>
    <Typography variant="h6" sx={{ mt: 2 }}>
      About this course
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Box>
);

// ReviewsSection Component
const ReviewsSection = ({ reviews }) => (
  <Box>
    <Typography variant="h6" sx={{ mt: 2 }}>
      Reviews
    </Typography>
    {reviews.length ? (
      reviews.map((review) => (
        <Box key={review.ReviewId} sx={{ mb: 2 }}>
          <Box display="flex" alignItems="flex-start">
            <Avatar
              alt={review.UserName}
              src={review.AvatarUrl || "/static/images/avatar/placeholder.jpg"}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {review.UserName}
              </Typography>
              <Rating
                name="read-only"
                value={review.ReviewRating}
                precision={0.5}
                readOnly
                sx={{ mb: 1 }}
              />
              <Typography variant="body2">{review.Review}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(review.TimeReview).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))
    ) : (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          No reviews yet
        </Typography>
      </Box>
    )}
  </Box>
);

// InstructorSection Component
const InstructorSection = ({ instructor }) => (
  <Box>
    <Typography variant="h6" sx={{ mt: 2 }}>
      Instructor Details
    </Typography>
    <Box display="flex">
      <Avatar
        alt={instructor?.name}
        src="/static/images/avatar/2.jpg"
        sx={{ width: 56, height: 56, mr: 2 }}
      />
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {instructor?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {instructor?.degrees}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {instructor?.address}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {instructor?.bio}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default CourseCard;
