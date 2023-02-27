import { rejects } from "assert";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { resolve } from "path";
import { useQuery } from "react-query";
import { db } from "../../firebase";
import {
  ChapterType,
  CourseType,
  FullCourse,
  PageType,
} from "./context/context";

const fetchCurrentPageFromFirebase = async (id: string, collection: string) => {
  if (id !== "" && collection !== "") {
    const docRef = doc(db, collection, id);
    return new Promise(async (resolve, reject) => {
      resolve((await getDoc(docRef)).data() as PageType);
    });
  }
  // TODO lægg tel home page på kurs når du åpne.
  else {
    const emptyPag: PageType = {
      Type: "null",
      Value: "null",
      id: "",
    };
    return emptyPag;
  }
};
const fetchFullCourseFromFirestore = async (ref: any) => {
  let chapters: ChapterType[] = [];
  let courseName: string;
  return new Promise(async (resolve, reject) => {
    await getDoc(ref)
      .then((course) => course.data() as CourseType)
      .then(async (courseData) => {
        courseName = courseData.Name;
        chapters = await Promise.all(
          courseData.Chapters.map(async (ref: DocumentReference<unknown>) => {
            return getDoc(ref).then((chapter) => chapter.data() as ChapterType);
          })
        );
      })
      .catch((err) => {
        console.log("Error : " + err);
      })
      .finally(() => {
        const fullCourse: FullCourse = {
          Course: courseName,
          Chapters: chapters,
        };
        resolve(fullCourse);
      });
  });
};

const fetchCourseContentFromFirebase = async (docCollection: string) => {
  if (docCollection !== "") {
    return new Promise(async (resolve, reject) => {
      await getDocs(collection(db, docCollection)).then((res) => {
        resolve(
          res.docs.map((ref) => {
            const courseData: CourseType = ref.data() as CourseType;
            courseData.id = ref.id;
            return courseData;
          })
        );
      });
    });
  }
  // TODO lægg tel home page på kurs når du åpne.
  else {
    const emptyCourse: CourseType = {
      Name: "string",
      Chapters: [],
      id: "string",
    };
    return emptyCourse;
  }
};

export const useFullCourse = (id: string, collection: string) => {
  const docRef = doc(db, collection, id);
  return useQuery(
    [id, collection],
    async () => {
      return await Promise.resolve(fetchFullCourseFromFirestore(docRef));
    },
    { refetchOnWindowFocus: false }
  );
};
export const useCurrentPage = (id: string, collection: string) => {
  return useQuery(
    [id, collection],
    async () => {
      return await Promise.resolve(
        fetchCurrentPageFromFirebase(id, collection)
      );
    },
    { refetchOnWindowFocus: false }
  );
};

export const useGetCollection = (collection: string) => {
  return useQuery(
    [collection],
    async () => {
      return await Promise.resolve(fetchCourseContentFromFirebase(collection));
    },
    { refetchOnWindowFocus: false }
  );
};
