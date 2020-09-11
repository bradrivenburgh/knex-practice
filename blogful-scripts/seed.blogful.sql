BEGIN;

INSERT INTO blogful_articles(title, content, date_published)
VALUES
  ('An Article About Something', 'This is some content', now() - '21 days'::INTERVAL),
  ('An Article About Nothing', 'This is some other content', now() - '20 days'::INTERVAL),
  ('An Article About Everthing', 'This is some other other content', now() - '19 days'::INTERVAL),
  ('An Article About Loss', 'This is some useless content', now() - '18 days'::INTERVAL),
  ('An Article About Gains', 'This is some useful content', now() - '17 days'::INTERVAL),
  ('An Article About Achievement', 'This is some absurd content', now() - '16 days'::INTERVAL),
  ('An Article About Tickets', 'This is some content', now() - '15 days'::INTERVAL),
  ('An Article About Cars', 'This is some other content', now() - '15 days'::INTERVAL),
  ('An Article About 86ing 45', 'This is some other other content', now() - '15 days'::INTERVAL),
  ('An Article About Politics', 'This is some useless content', now() - '10 days'::INTERVAL),
  ('An Article About Peaceful Protest', 'This is some useful content', now() - '9 days'::INTERVAL),
  ('An Article About Samwise Gamgee', 'This is an article about a hobbit', now() - '7 days'::INTERVAL),
  ('An Article About Frodo', 'This is about the savior of Middle Earth', now() - '21 days'::INTERVAL),
  ('An Article About Subaru Natsuki', 'Re:Zero is a good show', now() - '10 days'::INTERVAL),
  ('An Article About Being Awesome', 'This is some other other content', now() - '3 days'::INTERVAL),
  ('An Article About ...', 'This is some useless content', now() - '5 days'::INTERVAL),
  ('An Article About Frailty', 'This is some useful content', now() - '2 days'::INTERVAL),
  ('An Article About Agoraphobia', 'This is some absurd content', now() - '1 days'::INTERVAL),
  ('An Article About Survival', 'Bear Grylls is here to teach some lessons', now() - '8 days'::INTERVAL),
  ('An Article About Real Estate', 'This is some other content', now() - '7 days'::INTERVAL)
;

COMMIT;