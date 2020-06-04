using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dm01Entity.Literature;
using Dm02Context.Literature;

namespace Dm05WpfApp.Helpers
{
    public static class DbHelpers
    {
        public static string Editions2string()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("1 First Edition");
            sb.AppendLine("2 Second Edition");
            sb.AppendLine("3 Third Edition");
            sb.AppendLine("4 Fourth Edition");
            return sb.ToString();
        }

        public static string Gengers2string()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("1 Literary novel");
            sb.AppendLine("2 Literary story");
            sb.AppendLine("3 Literary essay");
            sb.AppendLine("4 Literary poem");
            sb.AppendLine("5 Literary short story");
            sb.AppendLine("6 Literary play");
            return sb.ToString();
        }

        public static string Languages2string()
        {
            StringBuilder sb = new StringBuilder();
            CultureInfo[] cultureInfos = CultureInfo.GetCultures(CultureTypes.NeutralCultures);
            foreach (CultureInfo cultureInfo in cultureInfos)
            {
                if (string.IsNullOrEmpty(cultureInfo.Name)) continue;
                sb.AppendLine(cultureInfo.EnglishName + new String(' ', 40 - cultureInfo.EnglishName.Length) + cultureInfo.TwoLetterISOLanguageName + new String(' ', 8 - cultureInfo.TwoLetterISOLanguageName.Length) + cultureInfo.ThreeLetterISOLanguageName);
            }
            return sb.ToString();
        }
        public static string Counties2string()
        {
            StringBuilder sb = new StringBuilder();
            CultureInfo[] cultureInfos = CultureInfo.GetCultures(CultureTypes.AllCultures & CultureTypes.SpecificCultures);
            foreach (CultureInfo cultureInfo in cultureInfos)
            {
                if (string.IsNullOrEmpty(cultureInfo.Name)) continue;
                RegionInfo regionInfo = new RegionInfo(cultureInfo.Name);
                sb.AppendLine(regionInfo.EnglishName + new String(' ', 40 - regionInfo.EnglishName.Length) + regionInfo.TwoLetterISORegionName + new String(' ', 8 - regionInfo.TwoLetterISORegionName.Length) + regionInfo.ThreeLetterISORegionName);
            }
            return sb.ToString();
        }
        public static string Dialects2string()
        {
            StringBuilder sb = new StringBuilder();
            CultureInfo[] cultureInfos = CultureInfo.GetCultures(CultureTypes.AllCultures & CultureTypes.SpecificCultures);
            foreach (CultureInfo cultureInfo in cultureInfos)
            {
                RegionInfo regionInfo = new RegionInfo(cultureInfo.Name);
                sb.AppendLine(cultureInfo.EnglishName + new String(' ', 50 - cultureInfo.EnglishName.Length) + cultureInfo.Name);
            }
            return sb.ToString();
        }


        public static void InsertGenger(this LitDbContext db, int GenreId, string GenreName)
        {
            if (!db.LitGenreDbSet.Any(l => (l.GenreName == GenreName)))
            {
                LitGenre genre = new LitGenre()
                {
                    GenreId = GenreId,
                    GenreName = GenreName
                };
                db.LitGenreDbSet.Add(genre);
                db.SaveChanges();
                db.Entry(genre).State = System.Data.Entity.EntityState.Detached;
            }
        }
        public static void PopulateGengers(this LitDbContext db)
        {
            db.InsertGenger(1, "Literary novel");
            db.InsertGenger(2, "Literary story");
            db.InsertGenger(3, "Literary essay");
            db.InsertGenger(4, "Literary poem");
            db.InsertGenger(5, "Literary short story");
            db.InsertGenger(6, "Literary play");

        }
        public static void InsertEdition(this LitDbContext db, int EditionId, string EditionName)
        {
            if (!db.LitEditionDbSet.Any(l => (l.EditionName == EditionName)))
            {
                LitEdition edition = new LitEdition()
                {
                    EditionId = EditionId,
                    EditionName = EditionName
                };
                db.LitEditionDbSet.Add(edition);
                db.SaveChanges();
                db.Entry(edition).State = System.Data.Entity.EntityState.Detached;
            }
        }
        public static void PopulateEditions(this LitDbContext db)
        {
            InsertEdition(db, 1, "First Edition");
            InsertEdition(db, 2, "Second Edition");
            InsertEdition(db, 3, "Third Edition");
            InsertEdition(db, 4, "Fourth Edition");
        }

        public static void PopulateCounties(this LitDbContext db)
        {
            CultureInfo[] cultureInfos = CultureInfo.GetCultures(CultureTypes.AllCultures & CultureTypes.SpecificCultures);
            foreach (CultureInfo cultureInfo in cultureInfos)
            {
                if (string.IsNullOrEmpty(cultureInfo.Name)) continue;
                RegionInfo regionInfo = new RegionInfo(cultureInfo.Name);
                if (!db.LitCountryDbSet.Any(c => (c.Iso3 == regionInfo.ThreeLetterISORegionName) && (c.Iso2 == regionInfo.TwoLetterISORegionName)))
                {
                    LitCountry сountry = new LitCountry()
                    {
                        Iso3 = regionInfo.ThreeLetterISORegionName,
                        Iso2 = regionInfo.TwoLetterISORegionName,
                        CountryName = regionInfo.EnglishName
                    };
                    db.LitCountryDbSet.Add(сountry);
                    db.SaveChanges();
                    db.Entry(сountry).State = System.Data.Entity.EntityState.Detached;
                }
            }
        }
        public static void PopulateLanguages(this LitDbContext db)
        {
            CultureInfo[] cultureInfos = CultureInfo.GetCultures(CultureTypes.NeutralCultures);
            foreach (CultureInfo cultureInfo in cultureInfos)
            {
                if (string.IsNullOrEmpty(cultureInfo.Name)) continue;
                if (!db.LitLanguageDbSet.Any(l => (l.Iso3 == cultureInfo.ThreeLetterISOLanguageName) && (l.Iso2 == cultureInfo.TwoLetterISOLanguageName)))
                {
                    LitLanguage lang = new LitLanguage()
                    {
                        Iso3 = cultureInfo.ThreeLetterISOLanguageName,
                        Iso2 = cultureInfo.TwoLetterISOLanguageName,
                        LanguageName = cultureInfo.EnglishName
                    };
                    db.LitLanguageDbSet.Add(lang);

                    db.SaveChanges();
                    db.Entry(lang).State = System.Data.Entity.EntityState.Detached;
                }
            }
        }

                public static void PopulateDialects(this LitDbContext db)
                {
                    CultureInfo[] cultureInfos = CultureInfo.GetCultures(CultureTypes.AllCultures & CultureTypes.SpecificCultures);
                    foreach (CultureInfo cultureInfo in cultureInfos)
                    {
                        if (string.IsNullOrEmpty(cultureInfo.Name)) continue;
                        RegionInfo regionInfo = new RegionInfo(cultureInfo.Name);

                        if (!db.LitLanguageDbSet.Any(l => (l.Iso3 == cultureInfo.ThreeLetterISOLanguageName) && (l.Iso2 == cultureInfo.TwoLetterISOLanguageName)))
                        {
                            continue;
                        }
                        if (!db.LitCountryDbSet.Any(c => (c.Iso3 == regionInfo.ThreeLetterISORegionName) && (c.Iso2 == regionInfo.TwoLetterISORegionName)))
                        {
                            continue;
                        }
                        if (db.LitDialectDbSet.Any(d => d.DialectId == cultureInfo.Name))
                        {
                            continue;
                        }
                        if (!db.LitDialectDbSet.Any(d =>
                            (d.Iso3CntrRef == regionInfo.ThreeLetterISORegionName) && (d.Iso2CntrRef == regionInfo.TwoLetterISORegionName) &&
                            (d.Iso3LngRef == cultureInfo.ThreeLetterISOLanguageName) && (d.Iso2LngRef == cultureInfo.TwoLetterISOLanguageName)))
                        {
                            LitDialect dialect = new LitDialect()
                            {
                                DialectId = cultureInfo.Name,

                                Iso3CntrRef = regionInfo.ThreeLetterISORegionName,
                                Iso2CntrRef = regionInfo.TwoLetterISORegionName,

                                Iso3LngRef = cultureInfo.ThreeLetterISOLanguageName,
                                Iso2LngRef = cultureInfo.TwoLetterISOLanguageName,

                                DialectName = cultureInfo.EnglishName
                            };
                            db.LitDialectDbSet.Add(dialect);
                            db.SaveChanges();
                            db.Entry(dialect).State = System.Data.Entity.EntityState.Detached;
                        }
                    }
                }


        


                        public static int InsertAuthor(this LitDbContext db, string FirstName, string LastName, DateTime BirthDate, DateTime DeathDate, string Iso3CntrRef, string Iso2CntrRef) {
                            int result = -1;
                            LitAuthor author = db.LitAuthorDbSet.Where(a => (a.FirstName == FirstName) && (a.LastName == LastName)).FirstOrDefault();
                            if(author!= null)
                            {
                                result = author.AuthorId;
                                db.Entry(author).State = System.Data.Entity.EntityState.Detached;
                                return result;
                            }
                            author = new LitAuthor()
                            {
                                FirstName = FirstName,
                                LastName = LastName,
                                BirthDate = BirthDate,
                                DeathDate = DeathDate,
                                Iso3CntrRef = Iso3CntrRef,
                                Iso2CntrRef = Iso2CntrRef
                            };
                            db.LitAuthorDbSet.Add(author);
                            db.SaveChanges();
                            result = author.AuthorId;
                            db.Entry(author).State = System.Data.Entity.EntityState.Detached;
                            return result;
                        }
                        public static int InsertManusript(this LitDbContext db, string ManuscriptTitle, DateTime CompletionDate, DateTime? BeginningDate, int AuthorIdRef, int GenreIdRef, string DialectIdRef)
                        {
                            int result = -1;
                            LitManuscript manuscript = db.LitManuscriptDbSet.Where(a => (a.ManuscriptTitle == ManuscriptTitle) && (a.AuthorIdRef == AuthorIdRef)).FirstOrDefault();
                            if (manuscript != null)
                            {
                                result = manuscript.ManuscriptId;
                                db.Entry(manuscript).State = System.Data.Entity.EntityState.Detached;
                                return result;

                            }
                            manuscript = new LitManuscript()
                            {
                                ManuscriptTitle = ManuscriptTitle,
                                CompletionDate = CompletionDate,
                                BeginningDate = BeginningDate,
                                AuthorIdRef = AuthorIdRef,
                                GenreIdRef = GenreIdRef,
                                DialectIdRef = DialectIdRef
                            };
                            db.LitManuscriptDbSet.Add(manuscript);
                            db.SaveChanges();
                            result = manuscript.ManuscriptId;
                            db.Entry(manuscript).State = System.Data.Entity.EntityState.Detached;
                            return result;

                        }

                        public static int InsertPublisher(this LitDbContext db, string PublisherName, string Iso3CntrRef, string Iso2CntrRef)
                        {
                            int result = -1;
                            LitPublisher publisher = db.LitPublisherDbSet.Where(a => (a.PublisherName == PublisherName) && (a.Iso3CntrRef == Iso3CntrRef)).FirstOrDefault();
                            if (publisher != null)
                            {
                                result = publisher.PublisherId;
                                db.Entry(publisher).State = System.Data.Entity.EntityState.Detached;
                                return result;
                            }
                            publisher = new LitPublisher()
                            {
                                PublisherName = PublisherName,
                                Iso3CntrRef = Iso3CntrRef,
                                Iso2CntrRef = Iso2CntrRef
                            };
                            db.LitPublisherDbSet.Add(publisher);
                            db.SaveChanges();
                            result = publisher.PublisherId;
                            db.Entry(publisher).State = System.Data.Entity.EntityState.Detached;
                            return result;
                        }

                        public static void PopulatePublishers(this LitDbContext db)
                        {
                            InsertPublisher(db, "Macmillan Inc.", "USA", "US");
                        }

                        public static int InsertBook(this LitDbContext db, string BookTitle, DateTime PublicationDate, Double Price, int PublisherIdRef, int ManuscriptIdRef, int? EditionIdRef)
                        {
                            int result = -1;
                            LitBook book = db.LitBookDbSet.Where(a => (a.BookTitle == BookTitle) && (a.PublisherIdRef == PublisherIdRef) && (a.ManuscriptIdRef == ManuscriptIdRef)).FirstOrDefault();
                            if (book != null)
                            {
                                result = book.BookId;
                                db.Entry(book).State = System.Data.Entity.EntityState.Detached;
                                return result;
                            }
                            book = new LitBook()
                            {
                                BookTitle = BookTitle,
                                PublicationDate = PublicationDate,
                                Price = Price,
                                PublisherIdRef = PublisherIdRef,
                                ManuscriptIdRef = ManuscriptIdRef,
                                EditionIdRef = EditionIdRef
                            };
                            db.LitBookDbSet.Add(book);
                            db.SaveChanges();
                            result = book.BookId;
                            db.Entry(book).State = System.Data.Entity.EntityState.Detached;
                            return result;
                        }

                        public static void PopulateAuthors(this LitDbContext db)
                        {
                            LitGenre novel = db.LitGenreDbSet.Where(l => (l.GenreName == "Literary novel")).FirstOrDefault();
                            LitGenre shortStory = db.LitGenreDbSet.Where(l => (l.GenreName == "Literary short story")).FirstOrDefault();
                            LitGenre play = db.LitGenreDbSet.Where(l => (l.GenreName == "Literary play")).FirstOrDefault();
                            LitEdition firstEdition = db.LitEditionDbSet.Where(l => (l.EditionName == "First Edition")).FirstOrDefault();



                            int MacmillanId = InsertPublisher(db, "Macmillan Inc.", "USA", "US");


                            int authorId = InsertAuthor(db, "Jack", "London", new DateTime(1876, 1, 12), new DateTime(1916, 11, 22), "USA", "US");
                            if (authorId > -1)
                            {
                                int ManuscriptId =
                                    InsertManusript(db, "The Cruise of the Dazzler", new DateTime(1902, 2, 12), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "The Cruise of the Dazzler", new DateTime(1903, 2, 12), 1.2, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "A Daughter of the Snows", new DateTime(1902, 3, 14), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "A Daughter of the Snows", new DateTime(1903, 2, 12), 1.3, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "The Call of the Wild", new DateTime(1903, 4, 14), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "A Daughter of the Snows", new DateTime(1904, 4, 12), 1.3, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "The Kempton-Wace Letters", new DateTime(1903, 4, 17), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "The Kempton-Wace Letters", new DateTime(1904, 4, 12), 1.4, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "The Sea-Wolf", new DateTime(1904, 1, 17), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "The Sea-Wolf", new DateTime(1904, 4, 17), 1.5, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "The Game", new DateTime(1905, 3, 12), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "The Game", new DateTime(1906, 3, 17), 1.5, MacmillanId, ManuscriptId, firstEdition.EditionId);


                                ManuscriptId =
                                    InsertManusript(db, "White Fang", new DateTime(1906, 4, 20), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "White Fang", new DateTime(1907, 4, 17), 1.5, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "Before Adam", new DateTime(1907, 7, 28), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "Before Adam", new DateTime(1908, 4, 27), 1.6, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "The Iron Heel", new DateTime(1908, 3, 27), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "The Iron Heel", new DateTime(1909, 5, 27), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "Martin Eden", new DateTime(1909, 4, 7), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "Martin Eden", new DateTime(1910, 5, 27), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);




                                ManuscriptId =
                                    InsertManusript(db, "An Old Soldier's Story", new DateTime(1893, 1, 15), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "An Old Soldier's Story", new DateTime(1894, 2, 17), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "Who Believes in Ghosts!", new DateTime(1894, 2, 12), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "Who Believes in Ghosts!", new DateTime(1895, 5, 28), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "And 'FRISCO Kid Came Back", new DateTime(1894, 3, 11), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "And 'FRISCO Kid Came Back", new DateTime(1895, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "One More Unfortunate", new DateTime(1894, 4, 27), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "One More Unfortunate", new DateTime(1895, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "Night's Swim In Yeddo Bay", new DateTime(1894, 5, 17), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "Night's Swim In Yeddo Bay", new DateTime(1895, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "Sakaicho, Hona Asi And Hakadaki", new DateTime(1894, 6, 7), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "Sakaicho, Hona Asi And Hakadaki", new DateTime(1895, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "A Klondike Christmas", new DateTime(1896, 6, 16), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "A Klondike Christmas", new DateTime(1897, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                    InsertManusript(db, "Mahatma's Little Joke", new DateTime(1896, 6, 26), null, authorId, shortStory.GenreId, "en-US");
                                InsertBook(db, "Mahatma's Little Joke", new DateTime(1897, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);




                                ManuscriptId =
                                    InsertManusript(db, "Theft", new DateTime(1909, 6, 26), null, authorId, play.GenreId, "en-US");
                                InsertBook(db, "Theft", new DateTime(1910, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);
                                ManuscriptId =
                                    InsertManusript(db, "Daughters of the Rich: A One Act Play", new DateTime(1914, 5, 26), null, authorId, play.GenreId, "en-US");
                                InsertBook(db, "Daughters of the Rich: A One Act Play", new DateTime(1910, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);
                                ManuscriptId =
                                    InsertManusript(db, "The Acorn Planter: A California Forest Play", new DateTime(1915, 5, 26), null, authorId, play.GenreId, "en-US");
                                InsertBook(db, "The Acorn Planter: A California Forest Play", new DateTime(1910, 4, 12), 1.7, MacmillanId, ManuscriptId, firstEdition.EditionId);
                            }


                            int scribnerMagazineId = InsertPublisher(db, "Scribner's Magazine", "USA", "US");
                            int scribnerSunId = InsertPublisher(db, "Charles Scribner's Sons", "USA", "US");
                            authorId = InsertAuthor(db, "Ernest", "Hemingway", new DateTime(1899, 7, 21), new DateTime(1961, 7, 2), "USA", "US");
                            if (authorId > -1)
                            {
                                int ManuscriptId =
                                    InsertManusript(db, "The Sun Also Rises", new DateTime(1925, 2, 12), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "The Sun Also Rises", new DateTime(1926, 2, 12), 1.2, scribnerMagazineId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                     InsertManusript(db, "A Farewell to Arms", new DateTime(1928, 2, 12), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "A Farewell to Arms", new DateTime(1929, 2, 12), 1.2, scribnerSunId, ManuscriptId, firstEdition.EditionId);

                                ManuscriptId =
                                     InsertManusript(db, "For Whom the Bell Tolls", new DateTime(1939, 2, 12), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "For Whom the Bell Tolls", new DateTime(1940, 2, 12), 1.2, scribnerSunId, ManuscriptId, firstEdition.EditionId);
                                ManuscriptId =
                                     InsertManusript(db, "The Old Man and the Sea", new DateTime(1951, 2, 12), null, authorId, novel.GenreId, "en-US");
                                InsertBook(db, "The Old Man and the Sea", new DateTime(1952, 2, 12), 1.2, scribnerSunId, ManuscriptId, firstEdition.EditionId);
                            }



                            int wardLockId = InsertPublisher(db, "Ward Lock & Co", "GBR", "GB");
                            int stoughtonId = InsertPublisher(db, "Hodder & Stoughton", "GBR", "GB");
                            authorId = InsertAuthor(db, "Arthur", "Conan Doyle", new DateTime(1859, 5, 22), new DateTime(1930, 7, 7), "GBR", "GB");
                            {
                                int ManuscriptId = // 20 November 1886
                                    InsertManusript(db, "The Mystery of Cloomber", new DateTime(1887, 2, 10), null, authorId, novel.GenreId, "en-GB");
                                InsertBook(db, "The Mystery of Cloomber", new DateTime(1888, 11, 20), 1.2, wardLockId, ManuscriptId, firstEdition.EditionId);
                                ManuscriptId =
                                    InsertManusript(db, "Sherlock Holmes", new DateTime(1885, 2, 10), null, authorId, novel.GenreId, "en-GB");
                                InsertBook(db, "Sherlock Holmes", new DateTime(1886, 11, 20), 1.2, wardLockId, ManuscriptId, firstEdition.EditionId);
                                ManuscriptId =
                                    InsertManusript(db, "The Lost World", new DateTime(1910, 2, 12), null, authorId, novel.GenreId, "en-GB");
                                InsertBook(db, "The Lost World", new DateTime(1911, 2, 12), 1.2, stoughtonId, ManuscriptId, firstEdition.EditionId);
                            }



                        }
                

    }
}
