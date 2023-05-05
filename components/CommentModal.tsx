import { useRef } from 'react'
import { useOutsideClick } from '@/lib/useOutsideClick'
import { useCommentsStore } from '@/store/commentsStore'
import ReactModal from 'react-modal'
import { shallow } from 'zustand/shallow'
import { closeIcon, emoji, imgIcon, pin } from '@/assets/icons'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
ReactModal.setAppElement('#__next')
const CommentModal = () => {
  const { data } = useSession()
  const [isOpen, post, setClose] = useCommentsStore(
    (state) => [state.isOpen, state.post, state.setClose],
    shallow
  )
  const refModal = useRef<HTMLDivElement>(null)
  useOutsideClick(refModal, setClose)

  console.log({ data })

  return (
    <ReactModal
      className='
     top-12  flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none'
      isOpen={isOpen}
      onRequestClose={setClose}
      shouldCloseOnEsc={true}
    >
      {' '}
      <div ref={refModal} className='mx-auto  max-w-[600px] z-50'>
        <div className=' border-0 rounded-xl shadow-lg flex flex-col bg-white outline-none focus:outline-none'>
          {/*header*/}
          <div className='flex items-center p-3 rounded-t'>
            <button
              className='text-gray-800 bg-transparent p-1 rounded-full hover:bg-gray-100  text-2xl outline-none focus:outline-none transition duration-300'
              onClick={setClose}
            >
              {closeIcon}
            </button>
          </div>
          {/*body*/}
          {post && (
            <div className='p-3'>
              <div className='flex gap-3'>
                <div className='w-12'>
                  <Image
                    src={post?.userImage}
                    alt='user'
                    width={44}
                    height={44}
                    className=' rounded-full cursor-pointer hover:brightness-95 w-12 h-11'
                  />
                </div>
                <div className='w-full'>
                  <div className='flex justify-start gap-1 whitespace-nowrap items-center'>
                    <h4 className='font-bold text-base hover:underline'>
                      {post.name}
                    </h4>
                    <span className='text-sm sm:text-base text-gray-500'>
                      @{post.username}
                    </span>
                  </div>
                  <p className='text-gray-800 text-base leading-1 mb-2'>
                    {post.text}
                  </p>
                </div>
              </div>
              {/*replay*/}

              <div className='flex mt-4'>
                <div className='w-12'>
                  <Image
                    src={data?.user.image!}
                    alt='user'
                    width={44}
                    height={44}
                    className=' rounded-full cursor-pointer hover:brightness-95 w-12 h-11'
                  />
                </div>
                <div className='w-full'>
                  <textarea
                    rows={4}
                    placeholder='Tweet your replay'
                    className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[100px] text-gray-700'
                    // value={input}
                    // onChange={handleChange}
                  ></textarea>

                  {!false && (
                    <div className='flex justify-between p-1 h-12'>
                      <div className='flex'>
                        <div
                          className='hoverSideMenu flex items-center justify-center'
                          // onClick={() => imgUploadRef?.current!.click()}
                        >
                          <span className='icon text-sky-500'>{imgIcon}</span>
                          <input
                            type='file'
                            hidden
                            // ref={imgUploadRef}
                            // onChange={addImage}
                            accept='/image/*'
                          />
                        </div>
                        <div className='hoverSideMenu flex items-center justify-center'>
                          <span className='icon text-sky-500'>{emoji}</span>
                        </div>
                        <div className='hoverSideMenu flex items-center justify-center'>
                          <span className='icon text-sky-500'>{pin}</span>
                        </div>
                      </div>
                      <button
                        // disabled={!input.trim()}
                        className='bg-sky-400 rounded-full px-4 text-white font-semibold text-md hover:brightness-95 disabled:opacity-50 cursor-pointer transition-all duration-200'
                        // onClick={savePost}
                      >
                        Replay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 bg-black'></div>
    </ReactModal>
  )
}

export default CommentModal
