/** カードコンポーネント
 * @param className 追加のクラス名
 * @param children カード内のコンテンツ
 * @param props その他のdivタグ属性
 */
export function Card({
  className = "",
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={`rounded bg-white shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
}
