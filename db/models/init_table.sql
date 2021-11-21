CREATE TABLE storypost (
    id SERIAL NOT NULL,
    img varchar(255),
    caption text,
    restriction varchar(50),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    created_by varchar(50),
    updated_by varchar(50),
    PRIMARY KEY(id),
    CONSTRAINT restriction_view CHECK (restriction IN ('friends','self'))
);

CREATE TABLE storypostcomment (
    id SERIAL NOT NULL,
    storypost_id INT NOT NULL,
    comment text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    created_by varchar(50),
    updated_by varchar(50),
    FOREIGN KEY (storypost_id) 
        REFERENCES storypost
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

-- If search text of caption is available
CREATE INDEX ON storypost (caption); 
-- Search for author of post
CREATE INDEX ON storypost (created_by);
-- Search for post of comment
CREATE INDEX ON storypostcomment (storypost_id);
-- Search for author of comment
CREATE INDEX ON storypostcomment (created_by);