const getAllParentClasses = (target, classes=[]) => {
    const parent = target.parentElement
    if (!parent) return classes


    const targetClasses = Array.from(target.classList)
    classes = classes.concat(targetClasses)

    return getAllParentClasses(parent, classes)
}

export const parentsHaveClass = (target, classStr) => {
    return getAllParentClasses(target).includes(classStr)
}
