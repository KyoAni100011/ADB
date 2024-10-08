CREATE PROCEDURE [RegisterStudent]
    @UserName NVARCHAR(100),
    @Password CHAR(60),
    @PhoneNumber NVARCHAR(15),
    @Email VARCHAR(100),
    @Street NVARCHAR(100),
    @Ward NVARCHAR(100),
    @District NVARCHAR(100),
    @City NVARCHAR(100),
    @DateOfBirth DATETIME2,
    @Gender VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Check if user already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE [Email] = @Email)
        BEGIN
            SELECT 'User already exists' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        DECLARE @UserId UNIQUEIDENTIFIER = NEWID();

        -- Insert new user
        INSERT INTO [User] (
            [UserId], [UserName], [Password], [PhoneNumber], [Email], 
            [Street], [Ward], [District], [City], [DateOfBirth], 
            [Gender], [Role], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, @UserName, @Password, @PhoneNumber, @Email, 
            @Street, @Ward, @District, @City, @DateOfBirth, 
            @Gender, 'Student', DEFAULT, DEFAULT
        );

        DECLARE @CartId UNIQUEIDENTIFIER = NEWID();

        -- Insert new student record
        INSERT INTO [Student] (
            [StudentId], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, DEFAULT, DEFAULT
        );

        -- Insert new cart record
        INSERT INTO [Cart] (
            [CartId], [UserId], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @CartId, @UserId, DEFAULT, DEFAULT
        );

        COMMIT TRANSACTION;

        SELECT 
            'User registered successfully' AS Message,
            (
                SELECT 
                    [UserId],
                    [UserName],
                    (SELECT 
                        [CartId]
                    FROM [Cart]
                    WHERE [UserId] = @UserId
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS CartData
                FROM [User]
                WHERE [UserId] = @UserId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS UserData;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred during registration' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [RegisterLecturer]
    @UserName NVARCHAR(100),
    @Password CHAR(60),
    @PhoneNumber NVARCHAR(15),
    @Email VARCHAR(100),
    @Street NVARCHAR(100),
    @Ward NVARCHAR(100),
    @District NVARCHAR(100),
    @City NVARCHAR(100),
    @DateOfBirth DATETIME2,
    @Gender VARCHAR(10),
    @Degrees NVARCHAR(100),
    @CurrentWorkplaceStreet NVARCHAR(100),
    @CurrentWorkplaceWard NVARCHAR(100),
    @CurrentWorkplaceDistrict NVARCHAR(100),
    @CurrentWorkplaceCity NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Check if user already exists
        IF EXISTS (SELECT 1 FROM [User] WHERE [Email] = @Email)
        BEGIN
            SELECT 'User already exists' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        DECLARE @UserId UNIQUEIDENTIFIER = NEWID();

        -- Insert new user
        INSERT INTO [User] (
            [UserId], [UserName], [Password], [PhoneNumber], [Email], 
            [Street], [Ward], [District], [City], [DateOfBirth], 
            [Gender], [Role], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, @UserName, @Password, @PhoneNumber, @Email, 
            @Street, @Ward, @District, @City, @DateOfBirth, 
            @Gender, 'Lecturer', DEFAULT, DEFAULT
        );

        -- Insert new lecturer record
        INSERT INTO [Lecture] (
            [LectureId], [Degrees], [CurrentWorkplaceStreet], 
            [CurrentWorkplaceWard], [CurrentWorkplaceDistrict], 
            [CurrentWorkplaceCity], [CreatedAt], [UpdatedAt]
        ) VALUES (
            @UserId, @Degrees, @CurrentWorkplaceStreet, 
            @CurrentWorkplaceWard, @CurrentWorkplaceDistrict, 
            @CurrentWorkplaceCity, DEFAULT, DEFAULT
        );

        COMMIT TRANSACTION;

        SELECT 
            'Lecturer registered successfully' AS Message,
            (SELECT 
                [UserName]
             FROM [User]
             WHERE [UserId] = @UserId
             FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS UserData;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred during registration' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [LoginUser]
    @Email VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DECLARE @UserId UNIQUEIDENTIFIER;
        DECLARE @StoredPassword CHAR(60); 

        -- Retrieve user information
        SELECT 
            @UserId = [UserId],
            @StoredPassword = [Password]
        FROM [User]
        WHERE [Email] = @Email;

        IF @UserId IS NULL
        BEGIN
            SELECT 'Invalid user' AS Message;
            RETURN;
        END;

        -- Select user data including CartId
        SELECT 
            'Login successful' AS Message,
            (
                SELECT 
                    u.[UserId],
                    u.[UserName],
                    u.[Password],
                    c.[CartId]
                FROM [User] u
                LEFT JOIN [Cart] c ON u.[UserId] = c.[UserId]
                WHERE u.[UserId] = @UserId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS UserData;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'An error occurred during login' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO


CREATE PROCEDURE [GetAllCourses]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT
            c.[CourseId],
            c.[Title],
            c.[LectureId],
            c.[Description],
            c.[Language],
            c.[Price],
            c.[CourseImageURL],
            c.[Subtitle],
            c.[Rating],
            c.[TotalReviews],
            c.[Level],
            u.[UserName],
            ca.[Description] AS [CategoryDescription],
            d.[DiscountPercent] 
        FROM [Course] c
        JOIN [Lecture] l ON l.LectureId = c.LectureId
        JOIN [User] u ON u.UserId = l.LectureId
        JOIN [Category] ca ON ca.CategoryId = c.CategoryId
        LEFT JOIN [Discount] d ON d.[DiscountId] = c.[DiscountId]
        WHERE c.[Status] = 'Active';
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'Error occurred during getting courses' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [GetCourseById]
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Check if the course exists
    IF NOT EXISTS (SELECT 1 FROM [Course] WHERE [CourseId] = @CourseId)
    BEGIN
        SELECT 'Course doesn''t exist' AS Message;
        RETURN;
    END;

    BEGIN TRY
        SELECT
            c.CourseId,
            c.Title AS CourseTitle,
            c.Description AS CourseDescription,
            c.Language,
            c.Price,
            c.CourseImageName,
            c.CourseImageURL,
            c.CourseVideoName,
            c.CourseVideoURL,
            c.Subtitle,
            c.Status AS CourseStatus,
            c.Rating AS CourseRating,
            c.NumberStudentsRegister,
            u.UserName AS LecturerName,
            l.LectureId AS LecturerId,
            l.Degrees,
            l.CurrentWorkplaceStreet,
            l.CurrentWorkplaceWard,
            l.CurrentWorkplaceDistrict,
            l.CurrentWorkplaceCity,
            l.Biography,
            (SELECT
                cat.Description AS Category,
                subcat.Description AS Subcategory
             FROM [Category] cat
             LEFT JOIN [Category] subcat ON cat.SubcategoryId = subcat.CategoryId
             WHERE cat.CategoryId = c.CategoryId
             FOR JSON PATH) AS Categories,
            (SELECT
                r.ReviewId,
                r.Review,
                r.Rating AS ReviewRating,
                r.TimeReview,
                u.UserName
             FROM Review r 
             JOIN [User] u ON u.UserId = r.UserId
             WHERE r.CourseId = @CourseId
             FOR JSON PATH) AS Reviews
        FROM Course c
        JOIN Lecture l ON c.LectureId = l.LectureId
        JOIN [User] u ON u.UserId = l.LectureId
        WHERE c.CourseId = @CourseId;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'Error occurred during getting course detail' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [EnrollCourse]
    @CourseId UNIQUEIDENTIFIER,
    @StudentId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the course exists
    IF NOT EXISTS (SELECT 1 FROM [Course] WHERE [CourseId] = @CourseId)
    BEGIN
        SELECT 'Course does not exist' AS Message;
        RETURN;
    END;

    -- Check if the student exists
    IF NOT EXISTS (SELECT 1 FROM [Student] WHERE [StudentId] = @StudentId)
    BEGIN
        SELECT 'Student does not exist' AS Message;
        RETURN;
    END;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Check if the student is already enrolled
        IF EXISTS (SELECT 1 FROM [StudentCourse] WHERE [CourseId] = @CourseId AND [StudentId] = @StudentId)
        BEGIN
            SELECT 'Student is already enrolled in this course' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Enroll student in the course
        INSERT INTO [StudentCourse] ([CourseId], [StudentId], [CreatedAt])
        VALUES (@CourseId, @StudentId, DEFAULT);

        COMMIT TRANSACTION;

        SELECT 'Student enrolled successfully' AS Message;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred during enrollment' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO


CREATE PROCEDURE [AddCartItem]
    @CartId UNIQUEIDENTIFIER,
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Check if the cart item already exists
        IF EXISTS (SELECT 1 FROM [CartItem] WHERE CartId = @CartId AND CourseId = @CourseId)
        BEGIN
            SELECT 'Item already exists in the cart' AS Message;
            RETURN;
        END;

        -- Insert the new cart item
        INSERT INTO [CartItem] (
            [CartId],
            [CourseId],
            [CreatedAt],
            [UpdatedAt]
        ) VALUES (
            @CartId,
            @CourseId,
            DEFAULT,
            DEFAULT
        );

        SELECT 'Cart item added successfully' AS Message;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'Error occurred while adding cart item' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE PROCEDURE [RemoveCartItem]
    @CartId UNIQUEIDENTIFIER,
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Delete the cart item
        DELETE FROM [CartItem]
        WHERE CartId = @CartId AND CourseId = @CourseId;

        -- Check if there are any items left in the cart
        IF NOT EXISTS (SELECT 1 FROM [CartItem] WHERE CartId = @CartId)
        BEGIN
            -- Delete the cart if it's empty
            DELETE FROM [Cart]
            WHERE CartId = @CartId;
        END

        SELECT 'Cart item removed successfully' AS Message;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
            'Error occurred while removing cart item' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [CreateOrder]
    @UserId UNIQUEIDENTIFIER,
    @CartId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @NewOrderId UNIQUEIDENTIFIER;
        DECLARE @OrderAmount BIGINT; -- Changed to BIGINT to accommodate large sums

        -- Temporary table to hold course info from cart with lecturers
        DECLARE @CartCourses TABLE (
            CartId UNIQUEIDENTIFIER,
            CourseId UNIQUEIDENTIFIER,
            LectureId UNIQUEIDENTIFIER,
            Price BIGINT
        );

        -- Insert courses from cart into the temporary table
        INSERT INTO @CartCourses
        SELECT c.CartId, c.CourseId, co.LectureId, co.Price
        FROM CartItem c
        JOIN Course co ON c.CourseId = co.CourseId
        WHERE c.CartId = @CartId;

        -- Check if the cart has items
        IF NOT EXISTS (SELECT 1 FROM @CartCourses)
        BEGIN
            SELECT 'Cart is empty' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Group by LectureId and process each group
        DECLARE lecture_cursor CURSOR FOR
        SELECT DISTINCT LectureId FROM @CartCourses;

        OPEN lecture_cursor;

        DECLARE @LectureId UNIQUEIDENTIFIER;

        FETCH NEXT FROM lecture_cursor INTO @LectureId;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Calculate total amount for the current lecture group
            SELECT @OrderAmount = SUM(Price)
            FROM @CartCourses
            WHERE LectureId = @LectureId;

            -- Create a new Order
            SET @NewOrderId = NEWID();

            INSERT INTO [Order] (OrderID, OrderAt, UserId, Amount, CreatedAt, UpdatedAt)
            VALUES (@NewOrderId, GETDATE(), @UserId, @OrderAmount, GETDATE(), GETDATE());

            -- Insert corresponding Order Items
            INSERT INTO OrderItem (OrderItemId, OrderId, CourseId, Quantity, CreatedAt, UpdatedAt)
            SELECT NEWID(), @NewOrderId, CourseId, 1, GETDATE(), GETDATE()
            FROM @CartCourses
            WHERE LectureId = @LectureId;

            -- Move to the next lecture
            FETCH NEXT FROM lecture_cursor INTO @LectureId;
        END

        CLOSE lecture_cursor;
        DEALLOCATE lecture_cursor;

        -- Optionally clear the cart after the order is placed
        DELETE FROM CartItem
        WHERE CartId = @CartId;

        COMMIT TRANSACTION;

        SELECT 'Order created successfully' AS Message;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred while creating the order' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO

CREATE OR ALTER PROCEDURE [GetListLessons]
    @CourseId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Check if the course has lessons
        IF NOT EXISTS (SELECT 1 FROM [Lesson] WHERE [CourseId] = @CourseId)
        BEGIN
            SELECT 'No lessons found for the specified course' AS Message;
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        -- Retrieve lessons for the specified course
        SELECT 
            [LessonId],
            [CourseId],
            [Title],
            [Description],
            [ImageName],
            [ImageURL],
            [VideoName],
            [VideoURL],
            [StartTime],
            [EndTime],
            [CreatedAt],
            [UpdatedAt]
        FROM 
            [Lesson]
        WHERE 
            [CourseId] = @CourseId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        ROLLBACK TRANSACTION;

        SELECT 
            'Error occurred while retrieving the lessons' AS Message,
            @ErrorMessage AS ErrorDetail;
    END CATCH
END;
GO




