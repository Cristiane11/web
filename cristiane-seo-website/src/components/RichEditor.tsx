import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useRef, useState } from 'react'
import { uploadImage } from '@/lib/upload'
import { errMsg } from '@/lib/utils'

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const b = (label: string, action: () => void, active = false) => (
    <button type="button" onClick={action} className={`rounded px-2 py-1 text-xs font-semibold ${active ? 'bg-primary text-white' : 'hover:bg-accent-soft'}`}>
      {label}
    </button>
  )
  const c = () => editor.chain().focus()
  return (
    <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
      {b('B', () => c().toggleBold().run(), editor.isActive('bold'))}
      {b('I', () => c().toggleItalic().run(), editor.isActive('italic'))}
      {b('H2', () => c().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }))}
      {b('H3', () => c().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }))}
      {b('• List', () => c().toggleBulletList().run(), editor.isActive('bulletList'))}
      {b('1. List', () => c().toggleOrderedList().run(), editor.isActive('orderedList'))}
      {b('Quote', () => c().toggleBlockquote().run(), editor.isActive('blockquote'))}
      {b('Link', () => {
        const url = prompt('Link URL', editor.getAttributes('link').href || 'https://')
        if (url === null) return
        if (url === '') c().unsetLink().run()
        else c().extendMarkRange('link').setLink({ href: url }).run()
      }, editor.isActive('link'))}
      {b(busy ? 'Uploading…' : 'Image', () => fileRef.current?.click())}
      {b('Undo', () => c().undo().run())}
      {b('Redo', () => c().redo().run())}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0]
          if (!f) return
          setBusy(true)
          try {
            const url = await uploadImage(f, 'posts/content')
            const alt = prompt('Describe the image (alt text for SEO)', f.name.replace(/\.\w+$/, '')) ?? ''
            c().setImage({ src: url, alt }).run()
          } catch (err) {
            alert(errMsg(err))
          } finally {
            setBusy(false)
            e.target.value = ''
          }
        }}
      />
    </div>
  )
}

export default function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: false }), Placeholder.configure({ placeholder: 'Write your post…' })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: 'prose-content' } },
  })
  if (!editor) return null
  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
