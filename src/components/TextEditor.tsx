import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import '../styles/css/main.css'
interface TinyMCEProps {
    initialValue: string
    onEditorChange: (content: string) => void
    height?: number
}

const TextEditor: React.FC<TinyMCEProps> = ({
    initialValue,
    onEditorChange,
    height,
}) => {
    const editorRef = useRef(null)
    return (
        <>
            <Editor
                value={initialValue}
                onEditorChange={onEditorChange}
                ref={editorRef} // Use ref to get access to the editor instance
                init={{
                    plugins:
                        'preview powerpaste casechange importcss searchreplace autolink  visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking insertdatetime advlist lists wordcount  permanentpen pageembed  quickbars linkchecker emoticons advtable export',

                    menubar: 'file edit view insert format tools table tc help',
                    toolbar:
                        'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks lineheight | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',

                    height: height ?? 500,
                    image_caption: true,
                    quickbars_selection_toolbar:
                        'bold italic quicklink | fontfamily fontsize ',
                    toolbar_mode: 'sliding',
                    font_family_formats:
                        'HeaderFont=Alata-Regular; SubHeaderRegular=GlacialIndifference-Regular; SubHeaderBold=GlacialIndifference-Bold',
                    font_size_formats:
                        '8px 10px 12px 14px 16px 18px 24px 36px 48px',
                    font_size_input_default_unit: 'px',
                    content_style:
                        'body { font-family:GlacialIndifference-Regular,GlacialIndifference-Bold,Alata-Regular; font-size:14px; margin:0 } ',
                }}
            />

            {/* <h2>Content:</h2>
            <div
                dangerouslySetInnerHTML={{
                    __html: editorRef?.current?.getContent(),
                }}
            /> */}
        </>
    )
}

export default TextEditor
