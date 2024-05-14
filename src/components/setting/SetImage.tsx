// import React, { useRef, useState, useEffect } from "react";

// interface SetImageProps {
//     onSetImage: (image: string) => void;
// }

// const SetImage: React.FC<SetImageProps> = ({onSetImage}) => {
    
//     const [image, setImage] = useState(() => {
//         const storedImage = localStorage.getItem("profileImage");
//         return storedImage ? storedImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
//     });

//     const fileInput = useRef<HTMLInputElement>(null);

//     const imageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//         const file = e.target.files?.[0];
//         if (!file) {
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = () => {
//             if (reader.readyState === 2) {
//                 const result = reader.result as string;
//                 setImage(result);
//                 onSetImage(result);
//                 localStorage.setItem("profileImage", result);
//             }
//         };
//         reader.readAsDataURL(file);
//     };

//     useEffect(() => {
//         // 이미지가 변경될 때마다 img 태그의 src 속성을 업데이트
//         const imgElement = document.getElementById("profile-image") as HTMLImageElement;
//         if (imgElement) {
//             imgElement.src = image;
//         }
//     }, [image]);
    
    
//     return (
//         <div className="flex justify-center py-10 overflow-hidden rounded-full">
//             <img
//             className="rounded-full object-fit"
//             id="profile-image"
//             src={image}
//             alt="프로필 사진 수정"
//             width={250}
//             height={200}
//             onClick={() => {
//                 fileInput.current?.click();
//             }}
//             />
//             <input
//             type="file"
//             accept="image/*"
//             onChange={imageChange}
//             ref={fileInput}
//             name="profile_img"
//             style={{display: "none"}}
//             />
//         </div>
//     );
// }; 
  
// export default SetImage;

import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';

interface SetImageProps {
    onSetImage: (image: string) => void;
}

const SetImage: React.FC<SetImageProps> = ({ onSetImage }) => {
    const [image, setImage] = useState(() => {
        const storedImage = localStorage.getItem("profileImage");
        return storedImage ? storedImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    });

    const fileInput = useRef<HTMLInputElement>(null);

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                const result = reader.result as string;
                setImage(result);
                onSetImage(result);
                localStorage.setItem("profileImage", result);
            }
        };
        reader.readAsDataURL(file);
    };

    const uploadImage = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post<{ imageUrl: string }>('your-upload-api-endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleImageUpload = async () => {
        const file = fileInput.current?.files?.[0];
        if (!file) {
            return;
        }

        try {
            const imageUrl = await uploadImage(file);
            setImage(imageUrl);
            onSetImage(imageUrl);
            localStorage.setItem("profileImage", imageUrl);
        } catch (error) {
            console.error('Error handling image upload:', error);
        }
    };

    useEffect(() => {
        // 이미지가 변경될 때마다 img 태그의 src 속성을 업데이트
        const imgElement = document.getElementById("profile-image") as HTMLImageElement;
        if (imgElement) {
            imgElement.src = image;
        }
    }, [image]);

    return (
        <div className="flex justify-center py-10 overflow-hidden rounded-full">
            <img
                className="rounded-full object-fit"
                id="profile-image"
                src={image}
                alt="프로필 사진 수정"
                width={250}
                height={200}
                onClick={() => {
                    fileInput.current?.click();
                }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={imageChange}
                ref={fileInput}
                name="profile_img"
                style={{ display: "none" }}
            />
        </div>
    );
};

export default SetImage;
