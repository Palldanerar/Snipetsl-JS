import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Sidibar from './components/Sidibar';
import Code from './components/Code';
import Headers from './components/Headers';

function App() {
  const [lectures, setLecture] = useState([])
  const [markdownText, setMarkdownText] = useState()
  const [task, setTask] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [activeLecture, setActiveLecture] = useState("")

  const getData = async () => {

    const responce = await fetch("http://localhost:9800/subject")
    const data = await responce.json()

    console.log("======")
    console.log(data)
    console.log("======")
    setLecture(data)
  }

  const setSubject = async (id) => {
    const responce = await fetch(`http://localhost:9800/subject/${id}`)
    const data = await responce.json()

    console.log(data)
    setActiveLecture(data.id)
    console.log(activeLecture)

    setMarkdownText(data.theory)
    setTask(JSON.parse(data.practice))
    setIsLoading(true)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className='w-full'>
        <Headers />
        <div className='flex px-2'>
          <div className='w-1/3'>
            <Sidibar setSubject={setSubject} lectures={lectures} />
          </div>
          <div className='w-full h-[100vh - 30px] overflow-auto pr-4'>
            {activeLecture ? <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');

                  return !inline && match ? (
                    <SyntaxHighlighter style={atomDark} PreTag="div" language={match[1]} {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {markdownText}
            </Markdown> : <h2>Выберете лекцию</h2>}

          </div>
        </div>
      </div>
    </>
  )
}

export default App
