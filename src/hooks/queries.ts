import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "../firebase";
import {
  ChapterType,
  CourseType,
  FullCourse,
  PageType,
} from "../context/context";

const fetchTopicNames = async () => {
  let topicList: string[] = []
 // const c = collection(db, "Topic")
  return new Promise(async (resolve, reject) => { 
    await getDocs(collection(db, "Topic")).then((documents) => {
      documents.forEach((document) => {
        topicList.push(document.data().Name)
      })
    }).finally(() => {
   
      resolve(topicList)
    })
  }) 
}
const fetchDefaultImage = async () => {
  return new Promise(async (resolve, reject) => { 
    const docRef = doc(db, "defaultImage", "image");
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) {
      resolve(docSnap.data())
    }
  }) 
}
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
      Name: "null",
      Type: "null",
      Value: "null",
      id: "",
    };
    return emptyPag;
  }
};
const fetchFullCourseFromFirestore = async (ref: any) => {
  let chapters: ChapterType[] = [];
  let course: CourseType;
  return new Promise(async (resolve, reject) => {
    await getDoc(ref)
      .then((course) => course.data() as CourseType)
      .then(async (courseData) => {
        course = courseData;
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
          Course: course,
          Chapters: chapters,
        };
        resolve(fullCourse);
      });
  });
};

const fetchCourseContentFromFirebase = async (docCollection: string, draft: boolean) => {
  if (docCollection !== "") {
    return new Promise(async (resolve, reject) => {
      let t: Array<CourseType> = []
      const q = query(collection(db, docCollection), where("draft", "==", draft))
      const querrySnapshot = await getDocs(q)
      querrySnapshot.forEach((course) => {
        const courseData: CourseType = course.data() as CourseType;
            courseData.id = course.id;
            t.push(courseData);
      })
      resolve(t)
    });
  }
  // TODO lægg tel home page på kurs når du åpne.
  else {
    const emptyCourse: CourseType = {
      Name: "string",
      draft: true,
      Chapters: [],
      id: "string",
    };
    return emptyCourse;
  }
};
const fetchCompletedPages = async (courseId: string, userId: string, docRef: DocumentReference) => {
 
    return new Promise(async (resolve, reject) => {
      const doc = await getDoc(docRef)
      if(doc.data()){
        const completedPageList = doc.data() as any
        resolve(completedPageList.pagesId)
      }
    })
}
const fetchCompletedCourses = async (docRef: DocumentReference) => {
  return new Promise(async (resolve, reject) => {
    const doc = await getDoc(docRef)
    if(doc.data()){
      const completedCourseList = doc.data() as any
      resolve(completedCourseList.courseIds)
    }
  })
}
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
//TODO fiks query key og her brukes fetch course, bør bytt navn
export const useGetCollection = (collection: string, draft: boolean) => {
  return useQuery(
    [collection, draft],
    async () => {
      return await Promise.resolve(fetchCourseContentFromFirebase(collection, draft));
    },
    { refetchOnWindowFocus: false }
  );
};
//TODO fix name
export const useGetTopicName = () => {
  return useQuery(
    ["topicName"],
    async () => {
      return await Promise.resolve(fetchTopicNames());
    },
    { refetchOnWindowFocus: false }
  );
};
export const useGetCompletedPages = (courseId: string, userId: string) => {
  const docRef = doc(db, "course_progress", userId, "completed_pages", courseId)
  
  return useQuery(
    ["s"],
    async () => {
      return await Promise.resolve(fetchCompletedPages(courseId, userId, docRef));
    },
    { refetchOnWindowFocus: false }
  );
}
//TODO dokumente heite test i firestore, bør finn nå nytt
export const useGetCompletedCourses = (userId: string) => {
  const docRef = doc(db, "course_progress", userId, "completed_courses", "test")
  return useQuery(
    ["s"],
    async () => {
      return await Promise.resolve(fetchCompletedCourses(docRef));
    },
    { refetchOnWindowFocus: false }
  );
}
export const useGetDefaultImage = () => {
  return useQuery(
    ["defaultImage"],
    async () => {
      return await Promise.resolve(fetchDefaultImage());
    },
    { refetchOnWindowFocus: false }
  );
}



