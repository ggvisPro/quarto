import os
from PIL import Image
import glob

def resize_images_in_folder(folder_path, target_size=(300, 300)):
    """
    将指定文件夹下的所有图片调整为目标尺寸
    
    Args:
        folder_path (str): 图片文件夹路径
        target_size (tuple): 目标尺寸 (宽度, 高度)
    """
    # 获取当前脚本所在目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 构建image文件夹的完整路径
    image_folder = os.path.join(current_dir, folder_path)
    
    # 检查文件夹是否存在
    if not os.path.exists(image_folder):
        print(f"错误：文件夹 '{image_folder}' 不存在")
        return
    
    # 支持的图片格式
    image_extensions = ['*.png', '*.jpg', '*.jpeg', '*.bmp', '*.gif', '*.tiff']
    
    # 获取所有图片文件
    image_files = []
    for extension in image_extensions:
        image_files.extend(glob.glob(os.path.join(image_folder, extension)))
        image_files.extend(glob.glob(os.path.join(image_folder, extension.upper())))
    
    if not image_files:
        print(f"在文件夹 '{image_folder}' 中没有找到任何图片文件")
        return
    
    print(f"找到 {len(image_files)} 个图片文件")
    print(f"目标尺寸：{target_size[0]}x{target_size[1]} 像素")
    print("-" * 50)
    
    # 处理每个图片文件
    success_count = 0
    for image_path in image_files:
        try:
            # 获取文件名
            filename = os.path.basename(image_path)
            print(f"正在处理：{filename}")
            
            # 打开图片
            with Image.open(image_path) as img:
                # 获取原始尺寸
                original_size = img.size
                print(f"  原始尺寸：{original_size[0]}x{original_size[1]}")
                
                # 调整尺寸（使用LANCZOS算法保持图片质量）
                resized_img = img.resize(target_size, Image.Resampling.LANCZOS)
                
                # 保存图片（覆盖原文件）
                resized_img.save(image_path)
                print(f"  调整后尺寸：{target_size[0]}x{target_size[1]} ✓")
                success_count += 1
                
        except Exception as e:
            print(f"  处理失败：{str(e)} ✗")
    
    print("-" * 50)
    print(f"处理完成！成功调整了 {success_count}/{len(image_files)} 个图片文件")

if __name__ == "__main__":
    # 调整image文件夹下的所有图片为100x100像素
    resize_images_in_folder("image", (300, 300))
