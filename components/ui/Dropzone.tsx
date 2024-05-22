'use client';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('accepted files::', acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'aplication/pdf': ['.pdf'],
    },
    onDrop,
  });

  return (
    <div
      className="max-w-2xl h-[300px] border-[2px] border-solid border-gray-300 rounded-xl p-10 flex items-center justify-center mx-auto my-10"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            width={70}
            height={70}
            src="/upload-icon.svg"
            alt="upload icon"
          />
          <p>Drop your PDF here ...</p>
        </div>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
}

// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// export default function Dropzone({ onUpload }) {
// //   const [selectedFile, setSelectedFile] = useState(null);

//   const { getRootProps, getInputProps } = useDropzone({
//     maxFiles: 1,
//     accept: {
//       'aplication/pdf': ['.pdf'],
//     },
//     onDrop: (acceptedFiles) => {
//         console.log('accepted files::',acceptedFiles);
//     //   setSelectedFile(acceptedFiles[0]);
//     //   onUpload(acceptedFiles);
//     },
//   });

//   return (
//     <DropzoneView
//       rootProps={getRootProps()}
//       inputProps={getInputProps()}
//       selectedFile={selectedFile}
//       acceptedFormats={acceptedFormat}
//       infoText={infoText}
//     />
//   );
// }

// function DropzoneView({
//   rootProps,
//   inputProps,
//   selectedFile,
//   acceptedFormats = {},
//   infoText,
// }) {
//   const readableAcceptedFormats = Object.values(acceptedFormats)
//     .flat()
//     .join(', ');

//   let body;

//   if (selectedFile) {
//     body = <span>{selectedFile.name}</span>;
//   } else {
//     body = (
//       <Stack spacing="2" alignItems="center">
//         <HStack spacing="1" whiteSpace="nowrap">
//           <Button variant="link" colorScheme="blue" size="sm">
//             Click to upload
//           </Button>
//           <Text fontSize="sm" color="muted">
//             or drag and drop
//           </Text>
//         </HStack>
//         <Text fontSize="xs" color="muted">
//           {readableAcceptedFormats} file(s) only
//         </Text>
//         {infoText && (
//           <Flex
//             alignItems="start"
//             justifyContent="center"
//             textAlign="center"
//             gap="1"
//           >
//             <InfoIcon flexGrow={1} pt="1" />
//             <Text fontSize="xs" color="blackAlpha.800">
//               {infoText}
//             </Text>
//           </Flex>
//         )}
//       </Stack>
//     );
//   }

//   return (
//     <Center
//       borderWidth="1px"
//       borderRadius="lg"
//       px="6"
//       py="4"
//       bg={useColorModeValue('gray.100', 'gray.800')}
//       {...rootProps}
//     >
//       <input {...inputProps} />

//       <VStack spacing="3">
//         <Square size="10" bg="bg-subtle" borderRadius="lg">
//           <Icon as={AiOutlineCloudUpload} boxSize="10" color="muted" />
//         </Square>
//         <VStack spacing="1">{body}</VStack>
//       </VStack>
//     </Center>
//   );
// }
